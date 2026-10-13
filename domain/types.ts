/**
 * Domain types — pure data contracts, no framework dependency.
 */

/** Product category slugs used for filtering and category colours. */
export type CategoryId = 'chua' | 'lac' | 'say' | 'banhtrang'

/** Special filter value that matches every product. */
export const ALL_FILTER = 'all' as const
export type FilterId = typeof ALL_FILTER | CategoryId

export interface Category {
  id: CategoryId
  /** Human label shown on the filter chip and the card tag. */
  label: string
}

export interface Product {
  /** Stable slug, also used as the Vue list key and cart key. */
  id: string
  name: string
  category: CategoryId
  /** Numeric price in VND, formatted for display via utils/format. */
  price: number
  /** Selling unit, e.g. "hũ", "phần", "gói". */
  unit: string
  /** Short blurb shown on the card body. */
  summary: string
  /** Fuller description used in structured data. */
  description: string
  /** Taste tags, separated by " · ", e.g. "Giòn · Chua cay". */
  taste: string
  /** Real product photo (light background, 4:3). Falls back to a striped placeholder. */
  thumbnail_url?: string
  /** Marks the product as a best-seller (sticker + hero feature). */
  featured?: boolean
}

/** A product in the cart together with its quantity and line total. */
export interface CartLine {
  product: Product
  qty: number
  subtotal: number
}

/** Everything the order image needs: what's in the cart plus a code and date. */
export interface OrderSnapshot {
  /** Short display code, e.g. "4821" (shown as "Đơn #4821"). */
  code: string
  /** Display date, e.g. "13/10/2026". */
  date: string
  lines: CartLine[]
  count: number
  total: number
}

/** Static brand / contact configuration. */
export interface SiteConfig {
  brandLead: string
  brandTail: string
  tagline: string
  messengerUrl: string
  instagramUrl: string
  openingHours: string
  deliveryArea: string
}
