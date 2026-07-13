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
  <article
    class="flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-soft-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft"
  >
    <ProductThumb
      :category="product.category"
      :name="product.name"
      :thumbnail="product.thumbnail_url"
      :show-best="product.featured"
      show-play
      show-img-tag
      @play="emit('play', product)"
    />
    <div class="flex flex-1 flex-col px-4 pb-[18px] pt-4">
      <h3 class="display text-[19px] leading-tight">{{ product.name }}</h3>
      <p class="mt-[5px] flex-1 text-[13.5px] text-muted">{{ product.summary }}</p>
      <span
        class="mt-2 self-start rounded-full border border-border bg-bg-2 px-[9px] py-[3px] text-[11px] font-semibold text-muted"
      >
        {{ product.taste }}
      </span>
      <div class="mt-3.5 flex items-center justify-between gap-2.5">
        <span class="display text-[17px] text-hot">
          {{ formatPrice(product.price)
          }}<span class="text-xs font-semibold text-faint">đ / {{ product.unit }}</span>
        </span>
        <button
          type="button"
          class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border-[1.5px] border-[var(--ghost-border)] bg-[var(--ghost-surface)] px-[13px] py-[9px] text-[13px] font-bold text-fg transition-all duration-[180ms] hover:border-accent hover:bg-accent hover:text-accent-ink [&_svg]:size-[15px]"
          @click="emit('snap', product)"
        >
          <IconCamera />
          Chụp
        </button>
      </div>
    </div>
  </article>
</template>
