import type { Product } from '~/domain/types'

/**
 * Formats a VND amount with a dot thousands-separator, e.g. 35000 -> "35.000".
 * Pure and framework-free so it can be unit-tested in isolation.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

/** "35.000đ" — a bare amount, used for totals and line subtotals. */
export function formatVnd(amount: number): string {
  return `${formatPrice(amount)}đ`
}

/** "35.000đ / hũ" — the compact price shown on cards and in the cart. */
export function formatPriceWithUnit(product: Pick<Product, 'price' | 'unit'>): string {
  return `${formatVnd(product.price)} / ${product.unit}`
}

/** "13/10/2026" — the date printed on the order image. */
export function formatOrderDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
