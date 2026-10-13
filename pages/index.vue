<script setup lang="ts">
/**
 * Landing page. Composes the sections; catalogue data comes from the API via
 * loadCatalog() (rendered on the server, refreshed on the client), menu state
 * (filter) lives in useMenu(), cart state in useCart().
 */
const { refresh } = await loadCatalog()
const { products, visibleProducts, activeFilter, isEmpty } = useMenu()
const { featured } = useCatalog()

// The HTML may be cached (ISR) — pull fresh stock and flash prices once the page is live,
// and again every minute while it stays open.
let timer: ReturnType<typeof setInterval>
onMounted(() => {
  void refresh()
  timer = setInterval(() => void refresh(), 60_000)
})
onBeforeUnmount(() => clearInterval(timer))

useHomeSeo({
  title: 'Menu đồ ăn vặt chua ngọt',
  description:
    'TÓP TÉP — đồ ăn vặt chua ngọt làm mới mỗi ngày: chùm ruột chanh muối, xoài lắc, cóc non, bánh tráng… Chọn món, đặt ngay trên web hoặc gửi ảnh đơn qua Messenger.',
  products,
})
</script>

<template>
  <div>
    <HeroSection :featured="featured" />
    <TasteMarquee />
    <StepsSection />
    <FlashSaleBanner />
    <ComboSection />
    <MenuSection v-model:filter="activeFilter" :products="visibleProducts" :is-empty="isEmpty" />
  </div>
</template>
