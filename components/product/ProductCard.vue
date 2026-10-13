<script setup lang="ts">
import type { Product } from '~/domain/types'
import { CATEGORIES } from '~/domain/constants'
import { CATEGORY_COLORS } from '~/design/tokens'
import { formatVnd } from '~/utils/format'

/** Menu card: photo, category + taste tags, name, blurb, price and add-to-cart. */
const props = defineProps<{ product: Product }>()

const categoryLabel = computed(
  () => CATEGORIES.find((c) => c.id === props.product.category)?.label,
)
</script>

<template>
  <article
    class="flex h-full flex-col overflow-hidden rounded-card border bg-white shadow-hard transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg"
  >
    <div class="relative border-b">
      <ProductThumb :product="product" class="aspect-[4/3]" />
      <BestSticker v-if="product.featured" class="absolute right-3 top-3" />
    </div>

    <div class="flex flex-1 flex-col p-4">
      <div class="flex flex-wrap gap-1.5 text-xs font-bold">
        <span
          class="rounded-full border-2 px-2.5 py-0.5"
          :style="{ background: CATEGORY_COLORS[product.category] }"
        >
          {{ categoryLabel }}
        </span>
        <span class="rounded-full border-2 bg-white px-2.5 py-0.5">{{ product.taste }}</span>
      </div>

      <h3 class="display mt-3 text-[22px]">{{ product.name }}</h3>
      <p class="mt-1.5 flex-1 text-sm text-muted">{{ product.summary }}</p>

      <div class="mt-4 flex items-center justify-between gap-3">
        <!-- Unit sits under the price so it reads the same at every card width. -->
        <p class="min-w-0">
          <span class="display block text-[24px]">{{ formatVnd(product.price) }}</span>
          <span class="text-sm font-semibold text-muted">/ {{ product.unit }}</span>
        </p>
        <CartControl :product="product" />
      </div>
    </div>
  </article>
</template>
