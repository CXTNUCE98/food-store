<script setup lang="ts">
import { getFeaturedProduct } from '~/data/products'

/**
 * Landing page. Composes the sections and connects card/hero intents to the
 * shared modal state. Menu state (products + filter) lives in useMenu().
 */
const { visibleProducts, activeFilter, isEmpty } = useMenu()
const { openVideo, openShare } = useProductModals()

const featured = getFeaturedProduct() ?? null
</script>

<template>
  <div>
    <HeroSection :featured="featured" @play="openVideo" @snap="openShare" />
    <StepsSection />
    <MenuSection
      v-model:filter="activeFilter"
      :products="visibleProducts"
      :is-empty="isEmpty"
      @play="openVideo"
      @snap="openShare"
    />
  </div>
</template>
