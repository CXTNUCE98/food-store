<script setup lang="ts">
import type { Combo } from '~/domain/types'
import { formatVnd } from '~/utils/format'

/** Combo card: what's inside, combo price vs. buying separately, add-to-cart. */
const props = defineProps<{ combo: Combo }>()

const { toSellable } = useCatalog()
const item = computed(() => toSellable('COMBO', props.combo))
const savings = computed(() => props.combo.originalPrice - (item.value.flashSale?.salePrice ?? props.combo.price))
const soldOut = computed(() => item.value.available <= 0)
</script>

<template>
  <article
    class="group flex h-full flex-col rounded-card border bg-white p-2.5 shadow-hard transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard-lg"
  >
    <div class="relative">
      <ProductThumb :product="{ ...combo, category: 'combo' }" class="aspect-[16/9] rounded-[20px] border-2" :class="soldOut && 'grayscale'" />
      <FlashSticker v-if="item.flashSale && !soldOut" :flash="item.flashSale" :price="item.price" class="absolute -left-1 top-2" />
      <span
        v-else-if="savings > 0"
        class="display absolute -left-1 top-2 -rotate-6 rounded-2xl border bg-mango px-3 py-1 text-[18px] shadow-hard-sm"
      >
        Tiết kiệm {{ formatVnd(savings) }}
      </span>
    </div>

    <div class="flex flex-1 flex-col px-2 pb-1.5 pt-3.5">
      <h3 class="display text-[25px]">{{ combo.name }}</h3>
      <ul class="mt-2.5 flex flex-wrap gap-1.5 text-xs font-extrabold">
        <li v-for="part in combo.items" :key="part.productId" class="rounded-full border-2 border-dashed bg-paper px-2.5 py-0.5">
          {{ part.qty }} {{ part.unit }} {{ part.name }}
        </li>
      </ul>
      <p v-if="combo.description" class="mt-3 flex-1 text-sm text-muted">{{ combo.description }}</p>
      <div v-else class="flex-1" />

      <div class="mt-4 flex items-center justify-between gap-3 border-t-2 border-dashed border-line pt-3.5">
        <div>
          <PriceTag :item="item" unit="combo" />
          <p v-if="!item.flashSale && combo.originalPrice > combo.price" class="text-xs font-semibold text-muted">mua lẻ <s>{{ formatVnd(combo.originalPrice) }}</s></p>
        </div>
        <CartControl :item="item" />
      </div>
    </div>
  </article>
</template>
