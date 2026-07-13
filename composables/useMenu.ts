import type { FilterId, Product } from '~/domain/types'
import { ALL_FILTER } from '~/domain/types'
import { getProducts } from '~/data/products'

/**
 * Menu state: holds the catalogue, the active category filter, and the
 * derived list of visible products. Keeps the filtering rule in one place
 * instead of scattering it through the components.
 */
export function useMenu() {
  const products = getProducts()
  const activeFilter = useState<FilterId>('menu-filter', () => ALL_FILTER)

  const visibleProducts = computed<Product[]>(() =>
    activeFilter.value === ALL_FILTER
      ? products
      : products.filter((p) => p.category === activeFilter.value),
  )

  const isEmpty = computed(() => visibleProducts.value.length === 0)

  function setFilter(filter: FilterId) {
    activeFilter.value = filter
  }

  return { products, activeFilter, visibleProducts, isEmpty, setFilter }
}
