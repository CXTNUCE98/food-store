<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatPrice } from '~/utils/format'

/**
 * Menu card. Emits intent up to the page rather than opening modals itself,
 * keeping the card free of global state.
 */
defineProps<{ product: Product }>()
const emit = defineEmits<{ play: [Product]; snap: [Product] }>()
</script>

<template>
  <article class="card">
    <ProductThumb
      :category="product.category"
      :name="product.name"
      :thumbnail="product.thumbnail_url"
      :show-best="product.featured"
      show-play
      show-img-tag
      @play="emit('play', product)"
    />
    <div class="card-body">
      <h3 class="display">{{ product.name }}</h3>
      <p class="desc">{{ product.summary }}</p>
      <span class="taste">{{ product.taste }}</span>
      <div class="card-foot">
        <span class="price display">
          {{ formatPrice(product.price) }}<span class="u">đ / {{ product.unit }}</span>
        </span>
        <button class="snap" type="button" @click="emit('snap', product)">
          <IconCamera />
          Chụp
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s;
  box-shadow: var(--shadow-sm);
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: var(--shadow);
}

.card-body {
  padding: 16px 16px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-body h3 {
  font-size: 19px;
  line-height: 1.2;
}

.desc {
  color: var(--muted);
  font-size: 13.5px;
  margin-top: 5px;
  flex: 1;
}

.taste {
  display: inline-block;
  align-self: flex-start;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  margin-top: 8px;
  font-weight: 600;
  background: var(--bg-2);
}

.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  gap: 10px;
}

.price {
  color: var(--hot);
  font-size: 17px;
}

.price .u {
  font-size: 12px;
  font-weight: 600;
  color: var(--faint);
}

.snap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  padding: 9px 13px;
  border-radius: 12px;
  background: var(--ghost-surface);
  border: 1.5px solid var(--ghost-border);
  color: var(--fg);
  cursor: pointer;
  transition: all 0.18s;
}

.snap:hover {
  background: var(--accent);
  color: var(--accent-ink);
  border-color: var(--accent);
}

.snap :deep(svg) {
  width: 15px;
  height: 15px;
}
</style>
