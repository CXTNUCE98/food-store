import type { OrderSnapshot } from '~/domain/types'
import { SITE } from '~/domain/constants'
import { COLORS, FONTS } from '~/design/tokens'
import { formatPriceWithUnit, formatVnd } from './format'

/**
 * Draws the order receipt onto a 1080px-wide canvas and returns it as a PNG.
 * It mirrors components/cart/OrderReceipt.vue (lime band, item rows, dashed
 * rule, big total) but is laid out straight so it reads well in a chat.
 */

const WIDTH = 1080
const MARGIN = 64 // paper around the card
const SHADOW = 16 // hard ink shadow offset
const BORDER = 6
const RADIUS = 56
const PAD = 56 // inside the card

const BAND_H = 216
const ROW_H = 108
const RULE_GAP = 32 // last row -> dashed rule
const TOTAL_H = 180 // dashed rule -> caption baseline

const CAPTION = `Gửi ảnh này qua Messenger để chốt đơn · ${SITE.openingHours}`

const font = {
  display: (size: number) => `800 ${size}px ${FONTS.display}`,
  body: (weight: number, size: number) => `${weight} ${size}px ${FONTS.body}`,
}

export async function renderOrderImage(order: OrderSnapshot): Promise<Blob> {
  await loadFonts(order)

  const cardX = MARGIN
  const cardY = MARGIN
  const cardW = WIDTH - MARGIN * 2 - SHADOW
  const cardH = BAND_H + 40 + order.lines.length * ROW_H + RULE_GAP + TOTAL_H + PAD
  const height = cardY + cardH + SHADOW + MARGIN

  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D is not supported')

  const left = cardX + PAD
  const right = cardX + cardW - PAD

  // Paper, hard shadow, white card.
  ctx.fillStyle = COLORS.paper
  ctx.fillRect(0, 0, WIDTH, height)
  roundedRect(ctx, cardX + SHADOW, cardY + SHADOW, cardW, cardH, RADIUS)
  ctx.fillStyle = COLORS.ink
  ctx.fill()
  roundedRect(ctx, cardX, cardY, cardW, cardH, RADIUS)
  ctx.fillStyle = COLORS.white
  ctx.fill()

  // Lime band, clipped to the card's rounded top, with an ink rule under it.
  ctx.save()
  roundedRect(ctx, cardX, cardY, cardW, cardH, RADIUS)
  ctx.clip()
  ctx.fillStyle = COLORS.lime
  ctx.fillRect(cardX, cardY, cardW, BAND_H)
  ctx.fillStyle = COLORS.ink
  ctx.fillRect(cardX, cardY + BAND_H - BORDER, cardW, BORDER)
  ctx.restore()

  ctx.fillStyle = COLORS.ink
  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'left'
  ctx.font = font.display(92)
  ctx.fillText(`${SITE.brandLead} ${SITE.brandTail}`, left, cardY + 122)
  ctx.fillStyle = COLORS['ink-soft']
  ctx.font = font.body(600, 32)
  ctx.fillText(`Đơn #${order.code} · ${order.date}`, left, cardY + 172)

  // Item rows: "2 × Name ........ 70.000đ" with the unit price underneath.
  let y = cardY + BAND_H + 40
  order.lines.forEach((line, i) => {
    const subtotal = formatVnd(line.subtotal)
    ctx.font = font.display(40)
    const subtotalW = ctx.measureText(subtotal).width
    ctx.textAlign = 'right'
    ctx.fillStyle = COLORS.ink
    ctx.fillText(subtotal, right, y + 48)

    ctx.textAlign = 'left'
    ctx.font = font.body(700, 34)
    ctx.fillText(fitText(ctx, `${line.qty} × ${line.product.name}`, right - left - subtotalW - 32), left, y + 46)
    ctx.font = font.body(400, 26)
    ctx.fillStyle = COLORS.muted
    ctx.fillText(formatPriceWithUnit(line.product), left, y + 84)

    if (i < order.lines.length - 1) {
      ctx.fillStyle = COLORS.line
      ctx.fillRect(left, y + ROW_H - 2, right - left, 2)
    }
    y += ROW_H
  })

  // Dashed rule, then the total.
  y += RULE_GAP
  ctx.save()
  ctx.strokeStyle = COLORS.ink
  ctx.lineWidth = 4
  ctx.setLineDash([20, 14])
  ctx.beginPath()
  ctx.moveTo(left, y)
  ctx.lineTo(right, y)
  ctx.stroke()
  ctx.restore()

  ctx.fillStyle = COLORS.ink
  ctx.textAlign = 'left'
  ctx.font = font.body(700, 34)
  ctx.fillText('Tổng cộng', left, y + 70)
  ctx.font = font.body(500, 26)
  ctx.fillStyle = COLORS.muted
  ctx.fillText(`${order.count} món`, left, y + 108)
  ctx.textAlign = 'right'
  ctx.fillStyle = COLORS.ink
  ctx.font = font.display(96)
  ctx.fillText(formatVnd(order.total), right, y + 108)

  y += TOTAL_H
  ctx.textAlign = 'left'
  ctx.font = font.body(500, 27)
  ctx.fillStyle = COLORS.muted
  ctx.fillText(fitText(ctx, CAPTION, right - left), left, y)

  // Card border last so it sits on top of the band edges.
  ctx.strokeStyle = COLORS.ink
  ctx.lineWidth = BORDER
  roundedRect(ctx, cardX + BORDER / 2, cardY + BORDER / 2, cardW - BORDER, cardH - BORDER, RADIUS - BORDER / 2)
  ctx.stroke()

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not encode PNG'))), 'image/png')
  })
}

/** Saves a blob through a temporary download link. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Web fonts load lazily per unicode-range, so ask for exactly the glyphs we
 * are about to draw (Vietnamese diacritics live in their own subset).
 */
async function loadFonts(order: OrderSnapshot) {
  if (!document.fonts) return
  const sample = [
    SITE.brandLead,
    SITE.brandTail,
    `Đơn #${order.code} ${order.date} Tổng cộng món ×`,
    CAPTION,
    ...order.lines.map((l) => `${l.product.name} ${formatPriceWithUnit(l.product)} ${formatVnd(l.subtotal)}`),
    formatVnd(order.total),
  ].join(' ')

  await Promise.all([
    document.fonts.load(`800 40px 'Bricolage Grotesque'`, sample),
    document.fonts.load(`400 20px 'Be Vietnam Pro'`, sample),
    document.fonts.load(`500 20px 'Be Vietnam Pro'`, sample),
    document.fonts.load(`600 20px 'Be Vietnam Pro'`, sample),
    document.fonts.load(`700 20px 'Be Vietnam Pro'`, sample),
  ]).catch(() => {
    // Fall back to system fonts rather than failing the download.
  })
}

/** Shortens text with an ellipsis until it fits `maxWidth` in the current font. */
function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text
  let cut = text
  while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxWidth) cut = cut.slice(0, -1)
  return `${cut.trimEnd()}…`
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
