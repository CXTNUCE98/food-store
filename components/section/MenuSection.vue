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
    <div class="menu-head">
      <div>
        <span class="eyebrow">Thực đơn hôm nay</span>
        <h2 class="display">Tất cả món đang có</h2>
      </div>
    </div>

    <div class="filters">
      <FilterChip label="Tất cả" :active="activeFilter === ALL_FILTER" @select="activeFilter = ALL_FILTER" />
      <FilterChip v-for="cat in CATEGORIES" :key="cat.id" :label="cat.label" :active="activeFilter === cat.id"
        @select="activeFilter = cat.id" />
    </div>

    <div class="grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @play="emit('play', $event)"
        @snap="emit('snap', $event)" />
      <p v-if="isEmpty" class="empty">Chưa có món trong danh mục này.</p>
    </div>
  </section>
</template>

<style scoped>
.menu-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin: 56px 0 20px;
  flex-wrap: wrap;
}

.menu-head h2 {
  font-size: clamp(28px, 4vw, 42px);
}

.menu-head p {
  color: var(--muted);
  font-size: 14px;
  max-width: 42ch;
  margin-top: 6px;
}

.menu-head code {
  background: var(--bg-2);
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 13px;
}

.filters {
  position: sticky;
  top: 63px;
  z-index: 30;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 14px 0;
  background: linear-gradient(to bottom, var(--bg) 62%, transparent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 8px;
}

.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 0;
  color: var(--faint);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
