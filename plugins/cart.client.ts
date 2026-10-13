import { CART_STORAGE_KEY, MAX_CART_QTY } from '~/domain/constants'
import { getProductById } from '~/data/products'

/**
 * Keeps the cart across reloads via localStorage. The stored cart is restored
 * only after hydration (the server always renders an empty cart), and unknown
 * products or bad quantities from an older menu are dropped on the way in.
 */
export default defineNuxtPlugin(() => {
  const { items } = useCart()

  onNuxtReady(() => {
    items.value = { ...readStoredCart(), ...items.value }

    watch(items, (value) => {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(value))
      } catch {
        // Storage can be full or blocked (private mode) — the cart still works in memory.
      }
    })
  })
})

function readStoredCart(): Record<string, number> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '{}')
    if (!raw || typeof raw !== 'object') return {}

    const cart: Record<string, number> = {}
    for (const [id, qty] of Object.entries(raw)) {
      if (getProductById(id) && typeof qty === 'number' && Number.isInteger(qty) && qty > 0) {
        cart[id] = Math.min(qty, MAX_CART_QTY)
      }
    }
    return cart
  } catch {
    return {}
  }
}
