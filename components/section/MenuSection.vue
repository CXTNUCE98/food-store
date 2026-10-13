<script setup lang="ts">
import type { FilterId, Product } from '~/domain/types'
import { ALL_FILTER } from '~/domain/types'

/**
 * Menu section: filter chips + responsive product grid. Filtering state comes
 * from the parent via v-model:filter so the page owns a single source of truth.
 * Chips show per-category counts; switching filters re-keys the cards so they
 * cascade back in through the reveal directive.
 */
defineProps<{ products: Product[]; isEmpty: boolean }>()
const activeFilter = defineModel<FilterId>('filter', { required: true })

const { products: all, categories } = useCatalog()
function countFor(filter: FilterId): number {
  return filter === ALL_FILTER ? all.value.length : all.value.filter((p) => p.category === filter).length
}
</script>

<template>
  <section id="menu" class="wrap pb-[clamp(64px,8vw,104px)] pt-4">
    <div v-reveal class="reveal">
      <p class="eyebrow">Thực đơn hôm nay</p>
      <h2 class="display mt-3 text-[clamp(36px,5vw,56px)]">Tất cả món đang có</h2>
      <p class="mt-3 font-medium text-muted">{{ all.length }} món · mới cập nhật hôm nay</p>
    </div>

    <div v-reveal="90" class="reveal mt-7 flex flex-wrap gap-3" role="group" aria-label="Lọc theo danh mục">
      <FilterChip
        label="Tất cả"
        :count="countFor(ALL_FILTER)"
        :active="activeFilter === ALL_FILTER"
        @select="activeFilter = ALL_FILTER"
      />
      <FilterChip
        v-for="cat in categories"
        :key="cat.id"
        :label="cat.label"
        :count="countFor(cat.id)"
        :active="activeFilter === cat.id"
        @select="activeFilter = cat.id"
      />
    </div>

    <div class="mt-9 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr))]">
      <div
        v-for="(product, index) in products"
        :key="`${activeFilter}-${product.id}`"
        v-reveal="(index % 4) * 80"
        class="reveal h-full"
      >
        <ProductCard :product="product" />
      </div>
      <p v-if="isEmpty" class="col-span-full py-16 text-center text-muted">
        Chưa có món trong danh mục này.
      </p>
    </div>
  </section>
</template>
