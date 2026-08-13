<script setup lang="ts">
import type { FilterId, Product } from '~/domain/types'
import { ALL_FILTER } from '~/domain/types'
import { CATEGORIES } from '~/domain/constants'
import { getProducts } from '~/data/products'

/**
 * Menu section: filter chips + responsive product grid. Filtering state comes
 * from the parent via v-model:filter so the page owns a single source of truth.
 * Chips show per-category counts; switching filters re-keys the cards so they
 * cascade back in through the reveal directive.
 */
defineProps<{ products: Product[]; isEmpty: boolean }>()
const activeFilter = defineModel<FilterId>('filter', { required: true })
const emit = defineEmits<{ play: [Product]; snap: [Product] }>()

const all = getProducts()
function countFor(filter: FilterId): number {
  return filter === ALL_FILTER ? all.length : all.filter((p) => p.category === filter).length
}
</script>

<template>
  <section class="wrap" id="menu">
    <div v-reveal class="reveal mb-5 mt-12 flex flex-wrap items-end justify-between gap-4">
      <div>
        <span class="eyebrow">Thực đơn hôm nay</span>
        <h2 class="display text-[clamp(28px,4vw,42px)]">Tất cả món đang có</h2>
      </div>
      <span
        class="rounded-full border border-border bg-surface px-3.5 py-[7px] text-[12.5px] font-semibold text-muted"
      >
        {{ products.length }} món · mới cập nhật hôm nay
      </span>
    </div>

    <div
      v-reveal="90"
      class="reveal no-scrollbar sticky top-[63px] z-30 -mx-6 flex gap-2 overflow-x-auto bg-[linear-gradient(to_bottom,var(--bg)_62%,transparent)] px-6 py-3.5 min-[681px]:mx-0 min-[681px]:flex-wrap min-[681px]:overflow-visible min-[681px]:px-0"
    >
      <FilterChip label="Tất cả" :count="countFor(ALL_FILTER)" :active="activeFilter === ALL_FILTER"
        @select="activeFilter = ALL_FILTER" />
      <FilterChip v-for="cat in CATEGORIES" :key="cat.id" :label="cat.label" :count="countFor(cat.id)"
        :active="activeFilter === cat.id" @select="activeFilter = cat.id" />
    </div>

    <div class="mt-2 grid grid-cols-1 gap-5 min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
      <div v-for="(product, index) in products" :key="`${activeFilter}-${product.id}`" v-reveal="(index % 3) * 90"
        class="reveal h-full">
        <ProductCard :product="product" @play="emit('play', $event)" @snap="emit('snap', $event)" />
      </div>
      <p v-if="isEmpty" class="col-span-full py-[60px] text-center text-faint">
        Chưa có món trong danh mục này.
      </p>
    </div>
  </section>
</template>
