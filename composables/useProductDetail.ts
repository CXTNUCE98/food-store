import type { Combo, Product, SellableKind, VideoInfo } from '~/domain/types'

/** One slide of the detail gallery: a photo, or the item's video. */
export type DetailMedia = { type: 'image'; url: string; alt: string } | { type: 'video'; video: VideoInfo }

/** Query param that carries the open item, so a product link can be shared: `/?mon=xoai-lac`. */
const QUERY_KEY: Record<SellableKind, string> = { PRODUCT: 'mon', COMBO: 'combo' }

/** Below this many units left the popup says how many remain. */
const LOW_STOCK = 10

/**
 * Everything the product detail popup shows, derived from the catalogue for
 * the item in `useOverlays().detail`: the product or combo, its sellable form
 * (price, flash sale, stock), the gallery, and what to suggest next — combos
 * the product is in and other dishes from its category. The popup itself is
 * only presentation, so each site can style it its own way.
 */
export function useProductDetail() {
  const { detail, openDetail, closeAll } = useOverlays()
  const { products, combos, toSellable, categoryLabel, categoryColor } = useCatalog()

  const product = computed<Product | null>(() =>
    detail.value?.kind === 'PRODUCT' ? (products.value.find((p) => p.id === detail.value!.id) ?? null) : null,
  )
  const combo = computed<Combo | null>(() =>
    detail.value?.kind === 'COMBO' ? (combos.value.find((c) => c.id === detail.value!.id) ?? null) : null,
  )
  const source = computed(() => product.value ?? combo.value)
  const item = computed(() =>
    product.value ? toSellable('PRODUCT', product.value) : combo.value ? toSellable('COMBO', combo.value) : null,
  )

  /** Shape ProductThumb accepts (combos take the combo accent). */
  const thumb = computed(() =>
    source.value ? { ...source.value, category: product.value?.category ?? 'combo' } : null,
  )

  const media = computed<DetailMedia[]>(() => {
    const x = source.value
    if (!x) return []
    const photos: DetailMedia[] = x.images?.length
      ? x.images.map((i) => ({ type: 'image', url: i.url, alt: i.alt || x.name }))
      : x.thumbnail_url
        ? [{ type: 'image', url: x.thumbnail_url, alt: x.name }]
        : []
    return x.video ? [...photos, { type: 'video', video: x.video }] : photos
  })

  const soldOut = computed(() => (item.value?.available ?? 0) <= 0)
  const lowStock = computed(() => !soldOut.value && (item.value?.available ?? 0) <= LOW_STOCK)
  const tastes = computed(() => product.value?.taste.split('·').map((t) => t.trim()).filter(Boolean) ?? [])
  const category = computed(() =>
    product.value
      ? { label: categoryLabel(product.value.category) ?? 'Món ngon', color: categoryColor(product.value.category) }
      : { label: 'Combo', color: categoryColor('combo') },
  )
  /** The longer text, unless it only repeats the card blurb. */
  const description = computed(() => {
    const x = source.value
    if (!x) return ''
    return product.value && x.description === product.value.summary ? '' : x.description
  })
  /** Combo price (flash price if one runs) vs. buying the items separately. */
  const comboSavings = computed(() =>
    combo.value ? combo.value.originalPrice - (item.value?.flashSale?.salePrice ?? combo.value.price) : 0,
  )

  /** Combos that include this product. */
  const inCombos = computed(() =>
    product.value ? combos.value.filter((c) => c.items.some((i) => i.productId === product.value!.id)) : [],
  )
  /** Other dishes from the same category: in stock first, then best-sellers. */
  const sameCategory = computed(() => {
    const p = product.value
    if (!p) return []
    return products.value
      .filter((x) => x.category === p.category && x.id !== p.id)
      .sort((a, b) => Number((b.available ?? 1) > 0) - Number((a.available ?? 1) > 0) || Number(!!b.featured) - Number(!!a.featured))
      .slice(0, 4)
  })
  /** The products inside a combo, when they are still on the menu. */
  const comboParts = computed(() =>
    combo.value?.items.map((part) => ({ ...part, product: products.value.find((p) => p.id === part.productId) ?? null })) ?? [],
  )
  /** Stand-in for a combo with no photo of its own: up to four of its dishes. */
  const platter = computed(() => comboParts.value.flatMap((part) => (part.product ? [part.product] : [])).slice(0, 4))

  return {
    detail,
    product,
    combo,
    item,
    thumb,
    media,
    soldOut,
    lowStock,
    tastes,
    category,
    description,
    comboSavings,
    inCombos,
    sameCategory,
    comboParts,
    platter,
    openDetail,
    close: closeAll,
  }
}

/**
 * Keeps the open item in the address bar (`?mon=slug` / `?combo=slug`) and opens
 * it from there on load, so a link to one dish can be shared. Uses replaceState
 * rather than the router: a router navigation would re-run the hash scroll and
 * jump the page behind the popup. Call once, from the popup component.
 */
export function useDetailUrlSync() {
  const { detail, openDetail } = useOverlays()
  const { products, combos } = useCatalog()

  onMounted(() => {
    const query = new URLSearchParams(location.search)
    for (const kind of ['PRODUCT', 'COMBO'] as const) {
      const id = query.get(QUERY_KEY[kind])
      const list: { id: string }[] = kind === 'PRODUCT' ? products.value : combos.value
      if (id && list.some((x) => x.id === id)) return openDetail(kind, id)
    }
  })

  watch(detail, (target) => {
    const url = new URL(location.href)
    for (const key of Object.values(QUERY_KEY)) url.searchParams.delete(key)
    if (target) url.searchParams.set(QUERY_KEY[target.kind], target.id)
    if (url.href !== location.href) history.replaceState(history.state, '', url)
  })
}
