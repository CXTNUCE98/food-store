/**
 * Shared open/closed state for the two overlays: the cart drawer and the
 * order-image modal. Any component can open them; the layout renders each
 * overlay once and locks page scroll while either is open.
 */
export function useOverlays() {
  const drawerOpen = useState('overlay-drawer', () => false)
  const orderOpen = useState('overlay-order', () => false)

  const isAnyOpen = computed(() => drawerOpen.value || orderOpen.value)

  function openDrawer() {
    orderOpen.value = false
    drawerOpen.value = true
  }

  /** The order image replaces the drawer rather than stacking on top of it. */
  function openOrder() {
    drawerOpen.value = false
    orderOpen.value = true
  }

  function closeAll() {
    drawerOpen.value = false
    orderOpen.value = false
  }

  return { drawerOpen, orderOpen, isAnyOpen, openDrawer, openOrder, closeAll }
}
