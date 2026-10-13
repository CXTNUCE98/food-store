import { CART_STORAGE_KEY, MAX_CART_QTY } from '~/domain/constants'
import { cartKey, parseCartKey } from '~/composables/useCart'

/**
 * Keeps the cart across reloads via localStorage. The stored cart is restored
 * only after hydration (the server always renders an empty cart). Keys from
 * the old product-only cart ("xoai-lac") are migrated to "PRODUCT:xoai-lac";
 * items that no longer exist are dropped once the live menu has loaded.
 */
export default defineNuxtPlugin(() => {
  const { items } = useCart()
  const { findSellable, online } = useCatalog()

  onNuxtReady(() => {
    items.value = { ...readStoredCart(), ...items.value }

    // Drop items that left the menu (only trust the live menu, not the offline fallback).
    watch(
      online,
      (isOnline) => {
        if (!isOnline) return
        const next: Record<string, number> = {}
        for (const [key, qty] of Object.entries(items.value)) {
          const ref = parseCartKey(key)
          const item = ref && findSellable(ref.kind, ref.id)
          if (item && item.available > 0) next[key] = Math.min(qty, item.available)
        }
        items.value = next
      },
      { immediate: true },
    )

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
    for (const [storedKey, qty] of Object.entries(raw)) {
      if (typeof qty !== 'number' || !Number.isInteger(qty) || qty <= 0) continue
      const key = parseCartKey(storedKey) ? storedKey : cartKey('PRODUCT', storedKey)
      cart[key] = Math.min(qty, MAX_CART_QTY)
    }
    return cart
  } catch {
    return {}
  }
}
