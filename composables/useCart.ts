import type { CartLine, Sellable, SellableKind } from '~/domain/types'
import { MAX_CART_QTY } from '~/domain/constants'

/** "PRODUCT:xoai-lac" — products and combos share one cart. */
export const cartKey = (kind: SellableKind, id: string) => `${kind}:${id}`

export function parseCartKey(key: string): { kind: SellableKind; id: string } | null {
  const [kind, ...rest] = key.split(':')
  if ((kind !== 'PRODUCT' && kind !== 'COMBO') || !rest.length) return null
  return { kind, id: rest.join(':') }
}

/**
 * Same split as the API's pricing: the flash price covers up to the remaining
 * slots / per-order limit, the rest is charged the regular price. The API
 * re-prices at checkout, so this is a faithful preview, not the source of truth.
 */
export function priceLine(item: Sellable, qty: number) {
  const f = item.flashSale
  if (!f) return { saleQty: 0, subtotal: qty * item.price }
  const cap = Math.min(f.remaining ?? Infinity, f.perOrderLimit ?? Infinity)
  const saleQty = Math.min(qty, cap)
  return { saleQty, subtotal: saleQty * f.salePrice + (qty - saleQty) * item.price }
}

/**
 * Cart state: a map of cart key -> quantity, plus the derived lines, item
 * count and total. Shared through `useState`, so every caller (cards, header,
 * drawer, checkout) sees the same cart. Persistence lives in plugins/cart.client.ts.
 */
export function useCart() {
  const items = useState<Record<string, number>>('cart', () => ({}))
  const { findSellable, products, combos } = useCatalog()

  // Lines follow menu order (combos first) so the drawer and the receipt read the same way.
  const lines = computed<CartLine[]>(() => {
    const order = [...combos.value.map((c) => cartKey('COMBO', c.id)), ...products.value.map((p) => cartKey('PRODUCT', p.id))]
    return Object.entries(items.value)
      .filter(([, qty]) => qty > 0)
      .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
      .flatMap(([key, qty]) => {
        const ref = parseCartKey(key)
        const item = ref && findSellable(ref.kind, ref.id)
        if (!item) return []
        return [{ key, item, qty, ...priceLine(item, qty) }]
      })
  })

  const count = computed(() => lines.value.reduce((sum, line) => sum + line.qty, 0))
  const total = computed(() => lines.value.reduce((sum, line) => sum + line.subtotal, 0))
  const savings = computed(() => lines.value.reduce((sum, line) => sum + line.item.price * line.qty - line.subtotal, 0))
  const isEmpty = computed(() => count.value === 0)

  function qtyOf(item: Pick<Sellable, 'kind' | 'id'>): number {
    return items.value[cartKey(item.kind, item.id)] ?? 0
  }

  function setQty(item: Pick<Sellable, 'kind' | 'id'> & { available?: number }, qty: number) {
    const key = cartKey(item.kind, item.id)
    const max = Math.min(MAX_CART_QTY, item.available ?? MAX_CART_QTY)
    const next = { ...items.value }
    if (qty > 0 && max > 0) next[key] = Math.min(qty, max)
    else delete next[key]
    items.value = next
  }

  function increment(item: Sellable) {
    setQty(item, qtyOf(item) + 1)
  }

  function decrement(item: Sellable) {
    setQty(item, qtyOf(item) - 1)
  }

  function clear() {
    items.value = {}
  }

  /** Request body for the API: refs are slugs. */
  const apiLines = computed(() => lines.value.map((l) => ({ type: l.item.kind, ref: l.item.id, qty: l.qty })))

  return { items, lines, count, total, savings, isEmpty, apiLines, qtyOf, setQty, increment, decrement, clear }
}
