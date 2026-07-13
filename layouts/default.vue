<script setup lang="ts">
/**
 * Default layout: persistent chrome (header, floating contact bar) wraps the
 * routed page content. Product modals are rendered here once so they overlay
 * every page and read their state from useProductModals().
 */
const { videoProduct, shareProduct, closeAll } = useProductModals()
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <FloatingContact />

    <VideoModal :product="videoProduct" @close="closeAll" />
    <ShareCard :product="shareProduct" @close="closeAll" />
  </div>
</template>
