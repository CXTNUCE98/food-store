<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatVnd } from '~/utils/format'

/**
 * A dish served on a round wooden plate with its name on a white label, like
 * the dishes around the banner title. Links to the product's card in the menu.
 */
const props = defineProps<{ product: Product; eager?: boolean }>()

const { toSellable } = useCatalog()
const item = computed(() => toSellable('PRODUCT', props.product))
</script>

<template>
  <a :href="`#${productAnchor(product.id)}`" class="group flex flex-col items-center">
    <span
      class="wood relative block aspect-square w-full rounded-full border-[3px] p-[8%] shadow-hard transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-[1.03]"
    >
      <ProductThumb :product="product" square :show-label="false" :width="280" :eager="eager" class="size-full rounded-full border-2" />
      <BestSticker v-if="product.featured" class="absolute -right-2 -top-2" />
      <FlashSticker v-else-if="item.flashSale" :flash="item.flashSale" :price="item.price" class="absolute -left-2 top-2" />
    </span>
    <span
      class="display relative -mt-5 max-w-full rounded-2xl border-[2.5px] border-orange bg-white px-3.5 pb-0.5 pt-1 text-center text-[15px] uppercase leading-tight shadow-hard-sm"
    >
      {{ product.name }}
    </span>
    <span class="mt-1.5 text-sm font-extrabold">
      {{ formatVnd(item.flashSale?.salePrice ?? item.price) }}<span class="font-bold text-muted"> / {{ product.unit }}</span>
    </span>
  </a>
</template>
