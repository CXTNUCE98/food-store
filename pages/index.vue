<script setup lang="ts">
/**
 * Landing page. Composes the sections; catalogue data comes from the API via
 * loadCatalog() (rendered on the server, refreshed on the client), menu state
 * (filter) lives in useMenu(), cart state in useCart().
 *
 * The HTML may be cached (ISR): refetch stock and flash prices once the page is
 * live, and again every minute while it stays open.
 */
import { SITE_NAME } from '~/site.config'

await loadCatalog({ refetchOnMount: 'always', refetchInterval: 60_000 })
const { products, visibleProducts, activeFilter, isEmpty } = useMenu()
const { featured } = useCatalog()

useHomeSeo({
  title: 'Menu đồ ăn vặt chua ngọt',
  description:
    `${SITE_NAME} — đồ ăn vặt chua ngọt làm mới mỗi ngày: chùm ruột chanh muối, xoài lắc, cóc non, bánh tráng… Chọn món, đặt ngay trên web hoặc gửi ảnh đơn qua Messenger.`,
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
