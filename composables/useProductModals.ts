import type { Product } from '~/domain/types'

/**
 * Shared modal state for the two product overlays (media preview + share card).
 * Any component can open a modal; the layout renders the overlays once and
 * reads the selected product from here. Using `useState` keeps the triggers
 * (cards, hero) and the overlays decoupled.
 */
export function useProductModals() {
  const previewProduct = useState<Product | null>('modal-preview', () => null)
  const shareProduct = useState<Product | null>('modal-share', () => null)

  function openPreview(product: Product) {
    previewProduct.value = product
  }

  function openShare(product: Product) {
    shareProduct.value = product
  }

  function closeAll() {
    previewProduct.value = null
    shareProduct.value = null
  }

  const isAnyOpen = computed(() => !!previewProduct.value || !!shareProduct.value)

  // Lock body scroll while any overlay is open (client only).
  if (import.meta.client) {
    watch(isAnyOpen, (open) => {
      document.body.style.overflow = open ? 'hidden' : ''
    })
  }

  return { previewProduct, shareProduct, isAnyOpen, openPreview, openShare, closeAll }
}
