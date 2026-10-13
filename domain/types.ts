/**
 * Domain types — pure data contracts, no framework dependency.
 * Shapes mirror the public API of food-store-be (`GET /catalog/menu`).
 */

/** Category slug (e.g. "chua", "lac"), managed in the admin. */
export type CategoryId = string

/** Special filter value that matches every product. */
export const ALL_FILTER = 'all' as const
export type FilterId = typeof ALL_FILTER | CategoryId

export interface Category {
  id: CategoryId
  /** Human label shown on the filter chip and the card tag. */
  label: string
  /** Accent colour for chips, tags and the photo placeholder. */
  color: string
  /** Number of products currently on sale in this category. */
  count?: number
}

/** An active flash-sale price on a product or combo. */
export interface FlashSaleInfo {
  flashSaleId: string
  name: string
  salePrice: number
  /** ISO end time — the price stops applying after this. */
  endsAt: string
  /** Sale slots left; null = unlimited. */
  remaining: number | null
  /** Units per order at the sale price; extra units are charged the regular price. */
  perOrderLimit: number | null
}

export interface MediaImage {
  url: string
  alt?: string | null
}

export interface VideoInfo {
  provider: 'youtube' | 'tiktok' | 'facebook'
  url: string
  embedUrl: string
}

export interface Product {
  /** Stable slug, also used as the Vue list key and cart key. */
  id: string
  name: string
  category: CategoryId
  /** Regular price in VND, formatted for display via utils/format. */
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
  images?: MediaImage[]
  video?: VideoInfo | null
  /** Marks the product as a best-seller (sticker + hero feature). */
  featured?: boolean
  inStock?: boolean
  /** Units in stock right now. */
  available?: number
  flashSale?: FlashSaleInfo | null
}

export interface Combo {
  id: string
  name: string
  description: string
  price: number
  /** Sum of the items at their regular prices. */
  originalPrice: number
  thumbnail_url?: string
  images?: MediaImage[]
  video?: VideoInfo | null
  items: { productId: string; name: string; qty: number; unit: string }[]
  inStock: boolean
  available: number
  endsAt?: string | null
  flashSale?: FlashSaleInfo | null
}

export type SellableKind = 'PRODUCT' | 'COMBO'

/** Anything that can go in the cart: a product or a combo, normalised. */
export interface Sellable {
  kind: SellableKind
  id: string
  name: string
  price: number
  unit: string
  thumbnail_url?: string
  /** Category slug for the accent colour; combos use "combo". */
  category: string
  available: number
  flashSale: FlashSaleInfo | null
}

/** An item in the cart together with its quantity and estimated line total. */
export interface CartLine {
  /** "PRODUCT:slug" / "COMBO:slug" — the cart key. */
  key: string
  item: Sellable
  qty: number
  /** Units charged at the flash price (the rest at the regular price). */
  saleQty: number
  subtotal: number
}

export interface MenuData {
  categories: Category[]
  products: Product[]
  combos: Combo[]
  flashSales: {
    running: { id: string; name: string; endsAt: string }[]
    upcoming: { id: string; name: string; startsAt: string; endsAt: string; itemCount: number }[]
  }
}

/** One printed row on the receipt / order image. */
export interface ReceiptLine {
  name: string
  qty: number
  /** "35.000đ / hũ" or "29.000đ ⚡ (giá gốc 35.000đ)". */
  priceLabel: string
  subtotal: number
}

/** Everything the order image needs: what's in the order plus its code and date. */
export interface OrderSnapshot {
  /** Order code from the API, e.g. "TT482193" (shown as "Đơn #TT482193"). */
  code: string
  /** Display date, e.g. "13/10/2026". */
  date: string
  lines: ReceiptLine[]
  count: number
  total: number
  /** Link encoded in the QR so the shop can open the order from the image. */
  trackingUrl?: string
}

/** Static brand / contact configuration (editable in the admin). */
export interface SiteConfig {
  brandLead: string
  brandTail: string
  tagline: string
  messengerUrl: string
  instagramUrl: string
  openingHours: string
  deliveryArea: string
  shippingNote?: string
  bankTransfer?: { bankName: string; accountNumber: string; accountName: string }
}

export type PaymentMethod = 'COD' | 'BANK_TRANSFER' | 'ONLINE'
export type DeliveryMethod = 'DELIVERY' | 'PICKUP'
