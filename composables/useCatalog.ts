import type { QueryClient } from '@tanstack/vue-query'
import type { Category, Combo, FlashSaleInfo, MenuData, PaymentMethod, Product, Sellable, SellableKind, SiteConfig } from '~/domain/types'
import type { NuxtApp } from '#app'
import { CATEGORY_COLORS } from '~/design/tokens'
import { SITE } from '~/domain/constants'
import { FALLBACK_MENU } from '~/data/products'

interface PublicSettings {
  site: SiteConfig
  paymentMethods: PaymentMethod[]
}

interface CatalogData {
  menu: MenuData
  settings: PublicSettings | null
}

/** The catalogue query: menu + public settings, fetched together. */
function catalogQueryOptions(queryClient: QueryClient) {
  return {
    queryKey: queryKeys.catalog,
    queryFn: async (): Promise<CatalogData> => {
      const [menu, settings] = await Promise.all([
        $foodStoreApi('/catalog/menu', { timeout: 8000 }) as Promise<MenuData>,
        // Settings are optional: keep the last known ones (or the defaults) if this call fails.
        ($foodStoreApi('/settings/public', { timeout: 8000 }) as Promise<PublicSettings>).catch(
          () => queryClient.getQueryData<CatalogData>(queryKeys.catalog)?.settings ?? null,
        ),
      ])
      return { menu, settings }
    },
    // One quick retry, then the fallback menu stays up rather than blocking the page.
    retry: 1,
  }
}

/** One catalogue observer per app, shared by every component (and the cart plugin). */
const catalogs = new WeakMap<NuxtApp, ReturnType<typeof createCatalog>>()

/**
 * Catalogue + shop settings shared by every component, backed by a TanStack
 * query. Pages load it with `await loadCatalog()` (SSR / ISR), then the client
 * refetches it in the background so stock and flash-sale prices are never stale
 * for long. Until the API answers (or if it never does) the static fallback menu
 * keeps the page usable.
 */
export function useCatalog() {
  const nuxtApp = useNuxtApp()
  let catalog = catalogs.get(nuxtApp)
  if (!catalog) {
    const queryClient = nuxtApp.$queryClient
    // Detached scope: the shared observer must outlive whichever component asked first.
    catalog = effectScope(true).run(() => createCatalog(queryClient))!
    catalogs.set(nuxtApp, catalog)
  }
  return catalog
}

function createCatalog(queryClient: QueryClient) {
  // The client is passed explicitly so this also works from plugins (no inject() there).
  const { data } = useQuery(catalogQueryOptions(queryClient), queryClient)
  const menu = computed<MenuData>(() => data.value?.menu ?? FALLBACK_MENU)
  const settings = computed<PublicSettings>(() =>
    data.value?.settings
      ? { site: { ...SITE, ...data.value.settings.site }, paymentMethods: data.value.settings.paymentMethods }
      : { site: SITE, paymentMethods: ['COD'] },
  )
  /** True once the live menu has loaded (the fallback can't take orders). */
  const online = computed(() => !!data.value)
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

/**
 * Page-level catalogue query. Awaited during SSR/ISR so the HTML carries the real
 * menu (dehydrated into the payload); on the client it only waits when nothing is
 * cached yet. `refetchInterval` keeps an open page's stock and flash prices fresh.
 */
export async function loadCatalog(options: { refetchOnMount?: boolean | 'always'; refetchInterval?: number } = {}) {
  const queryClient = useQueryClient()
  const query = useQuery({ ...catalogQueryOptions(queryClient), ...options })
  if (import.meta.server || !query.data.value) await query.suspense()
  return query
}

/** Refetches the catalogue (e.g. after the API rejected a stale cart). */
export function useRefreshCatalog() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.catalog })
}
