/**
 * Domain types — pure data contracts, no framework dependency.
 */

/** Product category slugs used for filtering and thumbnail styling. */
export type CategoryId = 'chua' | 'lac' | 'say' | 'banhtrang'

/** Special filter value that matches every product. */
export const ALL_FILTER = 'all' as const
export type FilterId = typeof ALL_FILTER | CategoryId

export interface Category {
  id: CategoryId
  /** Human label shown on the filter chip. */
  label: string
}

export interface Product {
  /** Stable slug, also used as the Vue list key. */
  id: string
  name: string
  category: CategoryId
  /** Numeric price in VND, formatted for display via utils/format. */
  price: number
  /** Selling unit, e.g. "hũ", "phần", "gói". */
  unit: string
  /** Short blurb shown on the card body. */
  summary: string
  /** Fuller description shown in the share card. */
  description: string
  /** Short taste tag, e.g. "Chua ngọt". */
  taste: string
  /** Poster/cover image shown on the card and as the video poster. */
  thumbnail_url?: string
  /** Video URL (YouTube/Vimeo watch/embed link or a direct mp4). */
  video_url?: string
  /** Gallery image URLs — clicked to view in the preview. */
  images?: string[]
  /** Marks the product as a best-seller (badge + hero feature). */
  featured?: boolean
}

/** A single item in a product's preview gallery. */
export interface MediaItem {
  kind: 'video' | 'image'
  /** The source URL: an embeddable/mp4 URL for video, an image URL otherwise. */
  src: string
  /** Preview image shown in the thumbnail strip. */
  poster: string
}

/** Theme identifiers. `warm` is the default (TÓP TÉP look). */
export type ThemeId = 'warm' | 'dark'

export interface ThemeOption {
  id: ThemeId
  label: string
}

/** Static brand / contact configuration. */
export interface SiteConfig {
  brandLead: string
  brandTail: string
  tagline: string
  messengerUrl: string
  zaloUrl: string
  instagramUrl: string
}
