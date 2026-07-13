import type { Product } from '~/domain/types'

/**
 * Shared modal state for the two product overlays (video + share card).
 * Any component can open a modal; the page renders the overlays once and
 * reads the selected product from here. Using `useState` keeps the triggers
 * (cards, hero) and the overlays decoupled.
 */
export function useProductModals() {
  const videoProduct = useState<Product | null>('modal-video', () => null)
  const shareProduct = useState<Product | null>('modal-share', () => null)

  function openVideo(product: Product) {
    videoProduct.value = product
  }

  function openShare(product: Product) {
    shareProduct.value = product
  }

  function closeAll() {
    videoProduct.value = null
    shareProduct.value = null
  }

  const isAnyOpen = computed(() => !!videoProduct.value || !!shareProduct.value)

  // Lock body scroll while any overlay is open (client only).
  if (import.meta.client) {
    watch(isAnyOpen, (open) => {
      document.body.style.overflow = open ? 'hidden' : ''
    })
  }

  return { videoProduct, shareProduct, isAnyOpen, openVideo, openShare, closeAll }
}
