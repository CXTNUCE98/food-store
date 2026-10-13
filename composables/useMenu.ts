import type { FilterId, Product } from '~/domain/types'
import { ALL_FILTER } from '~/domain/types'

/**
 * Menu state: the active category filter and the derived list of visible
 * products. Keeps the filtering rule in one place instead of scattering it
 * through the components. Data comes from useCatalog().
 */
export function useMenu() {
  const { products } = useCatalog()
  const activeFilter = useState<FilterId>('menu-filter', () => ALL_FILTER)

  const visibleProducts = computed<Product[]>(() =>
    activeFilter.value === ALL_FILTER
      ? products.value
      : products.value.filter((p) => p.category === activeFilter.value),
  )

  const isEmpty = computed(() => visibleProducts.value.length === 0)

  function setFilter(filter: FilterId) {
    activeFilter.value = filter
  }

  return { products, activeFilter, visibleProducts, isEmpty, setFilter }
}
