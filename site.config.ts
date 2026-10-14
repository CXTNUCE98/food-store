/**
 * Site identity — the ONE place that names this storefront.
 *
 * food-store-be is shared by every storefront (toptep, yummy-yummy, …), and
 * each site repo is a copy of the same Nuxt app. To spin up a new site, copy a
 * repo and change only the values below (plus package.json "name").
 *
 * Imported by nuxt.config.ts as well as the app (`~/site.config`), so keep it
 * free of Nuxt/Vue imports.
 */
export const SITE_IDENTITY = {
  /** Slug used for localStorage keys and downloaded file names. Changing it drops saved carts/orders. */
  key: 'top-tep',
  /** Wordmark, split in two parts (the logo puts each on its own sticker). */
  brandLead: 'TÓP',
  brandTail: 'TÉP',
  /** Default public origin (canonical URLs, sitemap, QR order links). Override with NUXT_PUBLIC_SITE_URL. */
  url: 'https://toptep.vercel.app/',
} as const

/** Full brand name for titles, SEO and copy, e.g. "TÓP TÉP". */
export const SITE_NAME = `${SITE_IDENTITY.brandLead} ${SITE_IDENTITY.brandTail}`
