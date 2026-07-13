<script setup lang="ts">
/**
 * Default layout: persistent chrome (header, floating contact bar) wraps the
 * routed page content. Product modals are rendered here once so they overlay
 * every page and read their state from useProductModals().
 */
const { previewProduct, shareProduct, openShare, closeAll } = useProductModals()
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <FloatingContact />

    <PreviewModal :product="previewProduct" @close="closeAll" @snap="openShare" />
    <ShareCard :product="shareProduct" @close="closeAll" />
  </div>
</template>
