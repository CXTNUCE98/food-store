import type { Category, Product } from '~/domain/types'
import { CATEGORY_COLORS } from '~/design/tokens'

export interface MenuGroup {
  category: Category
  products: Product[]
}

/** Products whose category isn't (or is no longer) in the admin's list land here. */
const OTHER: Category = { id: 'khac', label: 'Món khác', color: CATEGORY_COLORS.chua! }

/**
 * Menu state: the products grouped by category in the admin's order, empty
 * categories dropped. Keeps the grouping rule in one place for the category
 * shelf, the menu sidebar and the grouped grid. Data comes from useCatalog().
 */
export function useMenu() {
  const { products, categories } = useCatalog()

  const groups = computed<MenuGroup[]>(() => {
    const known = new Set(categories.value.map((c) => c.id))
    const list = categories.value
      .map((category) => ({ category, products: products.value.filter((p) => p.category === category.id) }))
      .filter((g) => g.products.length)
    const others = products.value.filter((p) => !known.has(p.category))
    if (others.length) list.push({ category: OTHER, products: others })
    return list
  })

  return { products, groups }
}

/** Anchor id of a category block in the menu, shared by every link that jumps to it. */
export const categoryAnchor = (id: string) => `danh-muc-${id}`

/** Anchor id of a product card in the menu. */
export const productAnchor = (id: string) => `mon-${id}`
