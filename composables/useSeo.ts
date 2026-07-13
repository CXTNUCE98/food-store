import type { Product } from '~/domain/types'
import { SITE, CATEGORIES } from '~/domain/constants'
import { formatPrice } from '~/utils/format'

interface HomeSeoInput {
  title: string
  description: string
  products: Product[]
}

/**
 * Applies all page-level SEO for the landing page in one place:
 * canonical URL, Open Graph + Twitter cards, and Restaurant/Menu JSON-LD.
 * Keeping it here means components stay presentational and the structured
 * data has a single source of truth.
 */
export function useHomeSeo({ title, description, products }: HomeSeoInput) {
  const { public: pub } = useRuntimeConfig()
  const siteUrl = (pub.siteUrl as string).replace(/\/$/, '')
  const canonical = `${siteUrl}/`
  const ogImage = products.find((p) => p.thumbnail_url)?.thumbnail_url ?? `${siteUrl}/og.jpg`

  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogSiteName: 'TÓP TÉP',
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogImage,
    ogLocale: 'vi_VN',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(buildRestaurantJsonLd(products, siteUrl)),
      },
    ],
  })
}

/**
 * Restaurant + hasMenu graph. Each product becomes a MenuItem with an Offer
 * carrying its price so search engines can surface rich menu results.
 */
function buildRestaurantJsonLd(products: Product[], siteUrl: string) {
  const menuSections = CATEGORIES.map((cat) => ({
    '@type': 'MenuSection',
    name: cat.label,
    hasMenuItem: products
      .filter((p) => p.category === cat.id)
      .map((p) => ({
        '@type': 'MenuItem',
        name: p.name,
        description: p.description,
        ...(p.thumbnail_url ? { image: p.thumbnail_url } : {}),
        offers: {
          '@type': 'Offer',
          price: formatPrice(p.price).replace(/\./g, ''),
          priceCurrency: 'VND',
        },
      })),
  })).filter((section) => section.hasMenuItem.length > 0)

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'TÓP TÉP',
    description: SITE.tagline,
    servesCuisine: 'Đồ ăn vặt Việt Nam',
    url: `${siteUrl}/`,
    priceRange: '₫₫',
    hasMenu: {
      '@type': 'Menu',
      name: 'Menu TÓP TÉP',
      hasMenuSection: menuSections,
    },
  }
}
