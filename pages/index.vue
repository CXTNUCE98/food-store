<script setup lang="ts">
/**
 * Landing page, laid out like a shop counter: banner hero with dishes on
 * plates, the category shelf, today's deals (flash sale, combos), the full
 * menu grouped by category, then how to order. Catalogue data comes from the
 * API via loadCatalog() (rendered on the server, refreshed on the client),
 * grouping lives in useMenu(), cart state in useCart().
 *
 * The HTML may be cached (ISR): refetch stock and flash prices once the page is
 * live, and again every minute while it stays open.
 */
import { SITE_NAME } from '~/site.config'

await loadCatalog({ refetchOnMount: 'always', refetchInterval: 60_000 })
const { products } = useCatalog()

useHomeSeo({
  title: 'Menu đồ ăn vặt chua ngọt',
  description:
    `${SITE_NAME} — đồ ăn vặt chua ngọt làm mới mỗi ngày: chùm ruột chanh muối, xoài lắc, cóc non, bánh tráng… Chọn món, đặt ngay trên web hoặc gửi ảnh đơn qua Messenger.`,
  products,
})
</script>

<template>
  <div>
    <HeroSection />
    <CategoryShelf />
    <FlashSaleBanner />
    <ComboSection />
    <MenuSection />
    <StepsSection />
  </div>
</template>
