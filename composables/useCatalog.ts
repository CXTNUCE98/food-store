import type { Category, Combo, FlashSaleInfo, MenuData, PaymentMethod, Product, Sellable, SellableKind, SiteConfig } from '~/domain/types'
import { CATEGORY_COLORS } from '~/design/tokens'
import { SITE } from '~/domain/constants'
import { FALLBACK_MENU } from '~/data/products'

interface PublicSettings {
  site: SiteConfig
  paymentMethods: PaymentMethod[]
}

/**
 * Catalogue + shop settings shared by every component. The page loads them
 * once with `await loadCatalog()` (SSR / ISR), then the client refreshes in
 * the background so stock and flash-sale prices are never stale for long.
 * When the API is unreachable the static fallback menu keeps the page usable.
 */
export function useCatalog() {
  const menu = useState<MenuData>('catalog', () => FALLBACK_MENU)
  const settings = useState<PublicSettings>('site-settings', () => ({ site: SITE, paymentMethods: ['COD'] }))
  const online = useState('catalog-online', () => false)
  const now = useNow()

  const categories = computed<Category[]>(() => menu.value.categories)
  const products = computed<Product[]>(() => menu.value.products)
  const combos = computed<Combo[]>(() => menu.value.combos)

  /** A flash price only counts until its end time and while slots remain. */
  function activeFlash(f?: FlashSaleInfo | null): FlashSaleInfo | null {
    if (!f) return null
    if (new Date(f.endsAt).getTime() <= now.value) return null
    if (f.remaining !== null && f.remaining <= 0) return null
    return f
  }

  function categoryColor(id: string): string {
    return categories.value.find((c) => c.id === id)?.color ?? CATEGORY_COLORS[id] ?? CATEGORY_COLORS.chua!
  }

  function categoryLabel(id: string): string | undefined {
    return categories.value.find((c) => c.id === id)?.label
  }

  function toSellable(kind: SellableKind, x: Product | Combo): Sellable {
    return {
      kind,
      id: x.id,
      name: x.name,
      price: x.price,
      unit: kind === 'COMBO' ? 'combo' : (x as Product).unit,
      thumbnail_url: x.thumbnail_url,
      category: kind === 'COMBO' ? 'combo' : (x as Product).category,
      available: x.available ?? 99,
      flashSale: activeFlash(x.flashSale),
    }
  }

  function findSellable(kind: SellableKind, id: string): Sellable | undefined {
    const x = kind === 'COMBO' ? combos.value.find((c) => c.id === id) : products.value.find((p) => p.id === id)
    return x ? toSellable(kind, x) : undefined
  }

  const featured = computed(() => products.value.find((p) => p.featured) ?? products.value[0] ?? null)
  const runningFlash = computed(() => menu.value.flashSales.running.filter((f) => new Date(f.endsAt).getTime() > now.value))

  return {
    menu,
    online,
    site: computed(() => settings.value.site),
    paymentMethods: computed(() => settings.value.paymentMethods),
    categories,
    products,
    combos,
    featured,
    runningFlash,
    activeFlash,
    categoryColor,
    categoryLabel,
    toSellable,
    findSellable,
  }
}

/** Fetches menu + settings. Await it in page setup so SSR/ISR renders real data. */
export async function loadCatalog() {
  const { apiBase } = useRuntimeConfig().public
  const menu = useState<MenuData>('catalog', () => FALLBACK_MENU)
  const settings = useState<PublicSettings>('site-settings', () => ({ site: SITE, paymentMethods: ['COD'] }))
  const online = useState('catalog-online', () => false)

  const { data, refresh } = await useAsyncData('catalog-fetch', async () => {
    const [m, s] = await Promise.all([
      $fetch<MenuData>('/catalog/menu', { baseURL: apiBase, timeout: 8000 }),
      $fetch<PublicSettings>('/settings/public', { baseURL: apiBase, timeout: 8000 }).catch(() => null),
    ])
    return { menu: m, settings: s }
  })

  const apply = () => {
    if (!data.value) return
    menu.value = data.value.menu
    online.value = true
    if (data.value.settings) settings.value = { site: { ...SITE, ...data.value.settings.site }, paymentMethods: data.value.settings.paymentMethods }
  }
  apply()
  watch(data, apply)
  return { refresh }
}
