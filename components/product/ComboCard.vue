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
  <article class="flex h-full flex-col overflow-hidden rounded-card border bg-white shadow-hard">
    <div class="relative border-b">
      <ProductThumb :product="{ ...combo, category: 'combo' }" class="aspect-[16/9]" :class="soldOut && 'grayscale'" />
      <FlashSticker v-if="item.flashSale && !soldOut" :flash="item.flashSale" :price="item.price" class="absolute left-3 top-3" />
      <span
        v-else-if="savings > 0"
        class="display absolute left-3 top-3 -rotate-6 rounded-2xl border bg-lime px-3 py-1.5 text-[18px] shadow-hard-sm"
      >
        Tiết kiệm {{ formatVnd(savings) }}
      </span>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <h3 class="display text-[24px]">{{ combo.name }}</h3>
      <ul class="mt-3 flex flex-wrap gap-1.5 text-xs font-bold">
        <li v-for="part in combo.items" :key="part.productId" class="rounded-full border-2 bg-paper px-2.5 py-0.5">
          {{ part.qty }} {{ part.unit }} {{ part.name }}
        </li>
      </ul>
      <p v-if="combo.description" class="mt-3 flex-1 text-sm text-muted">{{ combo.description }}</p>
      <div v-else class="flex-1" />

      <div class="mt-4 flex items-center justify-between gap-3">
        <div>
          <PriceTag :item="item" unit="combo" />
          <p v-if="!item.flashSale && combo.originalPrice > combo.price" class="text-xs text-muted">mua lẻ <s>{{ formatVnd(combo.originalPrice) }}</s></p>
        </div>
        <CartControl :item="item" />
      </div>
    </div>
  </article>
</template>
