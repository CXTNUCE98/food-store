<script setup lang="ts">
import { getFeaturedProduct } from '~/data/products'

/**
 * Landing page. Composes the sections and connects card/hero intents to the
 * shared modal state. Menu state (products + filter) lives in useMenu().
 */
const { products, visibleProducts, activeFilter, isEmpty } = useMenu()
const { openPreview, openShare } = useProductModals()

const featured = getFeaturedProduct() ?? null

useHomeSeo({
  title: 'Menu đồ ăn vặt chua ngọt',
  description:
    'TÓP TÉP — đồ ăn vặt chua ngọt làm mới mỗi ngày: chùm ruột chanh muối, xoài lắc, cóc non, bánh tráng… Chọn món, chụp màn hình, nhắn tin là chốt đơn.',
  products,
})
</script>

<template>
  <div>
    <HeroSection :featured="featured" @play="openPreview" @snap="openShare" />
    <StepsSection />
    <MenuSection
      v-model:filter="activeFilter"
      :products="visibleProducts"
      :is-empty="isEmpty"
      @play="openPreview"
      @snap="openShare"
    />
  </div>
</template>
