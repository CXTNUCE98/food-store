import type { CartLine, Product } from '~/domain/types'
import { MAX_CART_QTY } from '~/domain/constants'
import { getProducts } from '~/data/products'

/**
 * Cart state: a map of product id -> quantity, plus the derived lines, item
 * count and total. Shared through `useState`, so every caller (cards, header,
 * drawer, order image) sees the same cart. Persistence lives in
 * plugins/cart.client.ts.
 */
export function useCart() {
  const items = useState<Record<string, number>>('cart', () => ({}))

  // Lines follow menu order so the drawer and the order image read the same way.
  const lines = computed<CartLine[]>(() =>
    getProducts()
      .filter((p) => (items.value[p.id] ?? 0) > 0)
      .map((product) => {
        const qty = items.value[product.id]
        return { product, qty, subtotal: qty * product.price }
      }),
  )

  const count = computed(() => lines.value.reduce((sum, line) => sum + line.qty, 0))
  const total = computed(() => lines.value.reduce((sum, line) => sum + line.subtotal, 0))
  const isEmpty = computed(() => count.value === 0)

  function qtyOf(product: Product): number {
    return items.value[product.id] ?? 0
  }

  function setQty(product: Product, qty: number) {
    const next = { ...items.value }
    if (qty > 0) next[product.id] = Math.min(qty, MAX_CART_QTY)
    else delete next[product.id]
    items.value = next
  }

  function increment(product: Product) {
    setQty(product, qtyOf(product) + 1)
  }

  function decrement(product: Product) {
    setQty(product, qtyOf(product) - 1)
  }

  function clear() {
    items.value = {}
  }

  return { items, lines, count, total, isEmpty, qtyOf, setQty, increment, decrement, clear }
}
