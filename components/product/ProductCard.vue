<script setup lang="ts">
import type { Product } from '~/domain/types'

/** Menu card: photo, category + taste tags, name, blurb, price and add-to-cart. */
const props = defineProps<{ product: Product }>()

const { categoryLabel, categoryColor, toSellable } = useCatalog()
const item = computed(() => toSellable('PRODUCT', props.product))
const soldOut = computed(() => item.value.available <= 0)
</script>

<template>
  <article
    class="flex h-full flex-col overflow-hidden rounded-card border bg-white shadow-hard transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg"
  >
    <div class="relative border-b">
      <ProductThumb :product="product" class="aspect-[4/3]" :class="soldOut && 'grayscale'" />
      <FlashSticker v-if="item.flashSale && !soldOut" :flash="item.flashSale" :price="item.price" class="absolute left-3 top-3" />
      <BestSticker v-if="product.featured" class="absolute right-3 top-3" />
      <span v-if="soldOut" class="display absolute inset-x-0 bottom-4 mx-auto w-fit -rotate-3 rounded-full border bg-white px-4 py-1.5 text-[18px]">
        Tạm hết hàng
      </span>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <div class="flex flex-wrap gap-1.5 text-xs font-bold">
        <span class="rounded-full border-2 px-2.5 py-0.5" :style="{ background: categoryColor(product.category) }">
          {{ categoryLabel(product.category) }}
        </span>
        <span v-if="product.taste" class="rounded-full border-2 bg-white px-2.5 py-0.5">{{ product.taste }}</span>
      </div>

      <h3 class="display mt-3 text-[22px]">{{ product.name }}</h3>
      <p class="mt-1.5 flex-1 text-sm text-muted">{{ product.summary }}</p>

      <div class="mt-4 flex items-center justify-between gap-3">
        <!-- Unit sits under the price so it reads the same at every card width. -->
        <PriceTag :item="item" />
        <CartControl :item="item" />
      </div>
    </div>
  </article>
</template>
