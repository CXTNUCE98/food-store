import type { Product } from '~/domain/types'

/**
 * Formats a VND amount with a dot thousands-separator, e.g. 35000 -> "35.000".
 * Pure and framework-free so it can be unit-tested in isolation.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

/** "35.000đ / hũ" — the compact price shown on cards and modals. */
export function formatPriceWithUnit(product: Pick<Product, 'price' | 'unit'>): string {
  return `${formatPrice(product.price)}đ / ${product.unit}`
}

/** First letter of a name, upper-cased — used for the monogram placeholder. */
export function monogram(name: string): string {
  return (name.trim().charAt(0) || 'T').toUpperCase()
}
