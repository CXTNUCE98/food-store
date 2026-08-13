<script setup lang="ts">
import type { FilterId, Product } from '~/domain/types'
import { ALL_FILTER } from '~/domain/types'
import { CATEGORIES } from '~/domain/constants'

/**
 * Menu section: filter chips + responsive product grid. Filtering state comes
 * from the parent via v-model:filter so the page owns a single source of truth.
 */
defineProps<{ products: Product[]; isEmpty: boolean }>()
const activeFilter = defineModel<FilterId>('filter', { required: true })
const emit = defineEmits<{ play: [Product]; snap: [Product] }>()
</script>

<template>
  <section class="wrap" id="menu">
    <div v-reveal class="reveal mb-5 mt-14 flex flex-wrap items-end justify-between gap-4">
      <div>
        <span class="eyebrow">Thực đơn hôm nay</span>
        <h2 class="display text-[clamp(28px,4vw,42px)]">Tất cả món đang có</h2>
      </div>
    </div>

    <div
      v-reveal="90"
      class="reveal sticky top-[63px] z-30 flex flex-wrap gap-2 bg-[linear-gradient(to_bottom,var(--bg)_62%,transparent)] py-3.5"
    >
      <FilterChip label="Tất cả" :active="activeFilter === ALL_FILTER" @select="activeFilter = ALL_FILTER" />
      <FilterChip v-for="cat in CATEGORIES" :key="cat.id" :label="cat.label" :active="activeFilter === cat.id"
        @select="activeFilter = cat.id" />
    </div>

    <div class="mt-2 grid grid-cols-1 gap-5 min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
      <div v-for="(product, index) in products" :key="product.id" v-reveal="(index % 3) * 90" class="reveal h-full">
        <ProductCard :product="product" @play="emit('play', $event)" @snap="emit('snap', $event)" />
      </div>
      <p v-if="isEmpty" class="col-span-full py-[60px] text-center text-faint">
        Chưa có món trong danh mục này.
      </p>
    </div>
  </section>
</template>
