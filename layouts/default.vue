<script setup lang="ts">
/**
 * Default layout: persistent chrome (header, footer, floating cart bar) wraps
 * the routed page content. The cart drawer, order-image modal and product detail
 * popup are rendered here once so they overlay every page; page scroll is locked
 * while any of them is open.
 */
const { isAnyOpen } = useOverlays()
const { isEmpty } = useCart()

if (import.meta.client) {
  watch(isAnyOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  })
}
</script>

<template>
  <div id="top">
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <!-- Keeps the footer's last line clear of the floating cart bar. -->
    <div v-if="!isEmpty" aria-hidden="true" class="h-24 bg-ink" />

    <CartBar />
    <CartDrawer />
    <OrderModal />
    <ProductDetailModal />
  </div>
</template>
