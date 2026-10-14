import type { SellableKind } from '~/domain/types'

/** Which product or combo the detail popup is showing. */
export interface DetailTarget {
  kind: SellableKind
  id: string
}

/**
 * Shared open/closed state for the overlays: the cart drawer, the order-image
 * modal and the product detail popup. Any component can open them; the layout
 * renders each overlay once and locks page scroll while any is open. Only one
 * shows at a time — opening one replaces the others rather than stacking.
 */
export function useOverlays() {
  const drawerOpen = useState('overlay-drawer', () => false)
  const orderOpen = useState('overlay-order', () => false)
  const detail = useState<DetailTarget | null>('overlay-detail', () => null)

  const isAnyOpen = computed(() => drawerOpen.value || orderOpen.value || !!detail.value)

  function openDrawer() {
    orderOpen.value = false
    detail.value = null
    drawerOpen.value = true
  }

  /** The order image replaces the drawer rather than stacking on top of it. */
  function openOrder() {
    drawerOpen.value = false
    detail.value = null
    orderOpen.value = true
  }

  function openDetail(kind: SellableKind, id: string) {
    drawerOpen.value = false
    orderOpen.value = false
    detail.value = { kind, id }
  }

  function closeAll() {
    drawerOpen.value = false
    orderOpen.value = false
    detail.value = null
  }

  return { drawerOpen, orderOpen, detail, isAnyOpen, openDrawer, openOrder, openDetail, closeAll }
}
