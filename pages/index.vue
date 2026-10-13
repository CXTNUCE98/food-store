<script setup lang="ts">
import { getFeaturedProduct } from '~/data/products'

/**
 * Landing page. Composes the sections; menu state (products + filter) lives
 * in useMenu(), cart state in useCart().
 */
const { products, visibleProducts, activeFilter, isEmpty } = useMenu()

const featured = getFeaturedProduct() ?? null

useHomeSeo({
  title: 'Menu đồ ăn vặt chua ngọt',
  description:
    'TÓP TÉP — đồ ăn vặt chua ngọt làm mới mỗi ngày: chùm ruột chanh muối, xoài lắc, cóc non, bánh tráng… Chọn món, tạo ảnh đơn, nhắn tin là chốt đơn.',
  products,
})
</script>

<template>
  <div>
    <HeroSection :featured="featured" />
    <TasteMarquee />
    <StepsSection />
    <MenuSection v-model:filter="activeFilter" :products="visibleProducts" :is-empty="isEmpty" />
  </div>
</template>
