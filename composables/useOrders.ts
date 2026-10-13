import type { DeliveryMethod, OrderSnapshot, PaymentMethod } from '~/domain/types'
import { ORDERS_STORAGE_KEY } from '~/domain/constants'
import { formatOrderDate, formatVnd } from '~/utils/format'

export interface CreatedOrder {
  code: string
  trackingToken: string
  total: number
  subtotal: number
  discountTotal: number
  status: string
  paymentMethod: PaymentMethod
  createdAt: string
  items: { name: string; qty: number; unit: string | null; unitPrice: number; finalUnitPrice: number; lineTotal: number }[]
}

export interface CheckoutContact {
  customerName?: string
  customerPhone?: string
  address?: string
  deliveryMethod?: DeliveryMethod
  note?: string
  paymentMethod?: PaymentMethod
}

/** API error body: { statusCode, code, message, details? } */
export interface ApiError {
  statusCode: number
  code: string
  message: string
  details?: { lines?: { type: string; ref: string; available: number; issues: string[] }[] }
}

export function toApiError(err: unknown): ApiError {
  const data = (err as { data?: ApiError })?.data
  return data?.message ? data : { statusCode: 0, code: 'NETWORK', message: 'Không kết nối được máy chủ. Thử lại sau ít phút nhé.' }
}

interface SavedOrder {
  code: string
  token: string
  createdAt: string
}

/** Places orders and remembers them in this browser so the tracking page needs no login. */
export function useOrders() {
  const { apiBase, siteUrl } = useRuntimeConfig().public
  const cart = useCart()

  function remember(order: CreatedOrder) {
    try {
      const list: SavedOrder[] = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]')
      const next = [{ code: order.code, token: order.trackingToken, createdAt: order.createdAt }, ...list.filter((o) => o.code !== order.code)].slice(0, 10)
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Private mode: the tracking link in the confirmation still works.
    }
  }

  function savedToken(code: string): string | null {
    try {
      const list: SavedOrder[] = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]')
      return list.find((o) => o.code === code)?.token ?? null
    } catch {
      return null
    }
  }

  function savedOrders(): SavedOrder[] {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]')
    } catch {
      return []
    }
  }

  /**
   * WEB = checkout form; MESSENGER = "send the order image" (contact optional).
   * The fetcher behind OrderModal's useMutation.
   */
  async function placeOrder(source: 'WEB' | 'MESSENGER', contact: CheckoutContact = {}): Promise<CreatedOrder> {
    const order = await $fetch<CreatedOrder>('/orders', {
      baseURL: apiBase,
      method: 'POST',
      body: { lines: cart.apiLines.value, source, ...contact },
    })
    remember(order)
    return order
  }

  function trackingUrl(order: Pick<CreatedOrder, 'code' | 'trackingToken'>) {
    return `${String(siteUrl).replace(/\/$/, '')}/don-hang/${order.code}?t=${order.trackingToken}`
  }

  /** Receipt/image data built from the API's priced items (flash prices included). */
  function snapshot(order: CreatedOrder): OrderSnapshot {
    return {
      code: order.code,
      date: formatOrderDate(new Date(order.createdAt)),
      lines: order.items.map((i) => ({
        name: i.name,
        qty: i.qty,
        priceLabel:
          i.finalUnitPrice < i.unitPrice
            ? `${formatVnd(i.finalUnitPrice)} ⚡ flash sale (gốc ${formatVnd(i.unitPrice)})`
            : `${formatVnd(i.finalUnitPrice)}${i.unit ? ` / ${i.unit}` : ''}`,
        subtotal: i.lineTotal,
      })),
      count: order.items.reduce((s, i) => s + i.qty, 0),
      total: order.total,
      trackingUrl: trackingUrl(order),
    }
  }

  return { placeOrder, snapshot, trackingUrl, savedToken, savedOrders }
}
