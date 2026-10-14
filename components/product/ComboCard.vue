<script setup lang="ts">
import type { Combo } from '~/domain/types'
import { formatVnd } from '~/utils/format'

/**
 * Combo card in two layouts: `spotlight` (big photo beside the full contents
 * list, used for the lead combo) and `row` (compact: square photo, name,
 * contents in one line, price and add-to-cart).
 */
const props = withDefaults(defineProps<{ combo: Combo; layout?: 'spotlight' | 'row' }>(), { layout: 'row' })

const { toSellable } = useCatalog()
const item = computed(() => toSellable('COMBO', props.combo))
const savings = computed(() => props.combo.originalPrice - (item.value.flashSale?.salePrice ?? props.combo.price))
const soldOut = computed(() => item.value.available <= 0)
const thumbProduct = computed(() => ({ ...props.combo, category: 'combo' }))
</script>

<template>
  <article
    v-if="layout === 'spotlight'"
    class="grid h-full overflow-hidden rounded-hero border-[3px] bg-white shadow-hard-lg md:grid-cols-[1.05fr_1fr]"
  >
    <div class="relative p-3 md:pr-0">
      <ProductThumb :product="thumbProduct" class="aspect-[4/3] h-full rounded-[26px] border-2 md:aspect-auto md:min-h-[320px]" :class="soldOut && 'grayscale'" />
      <FlashSticker v-if="item.flashSale && !soldOut" :flash="item.flashSale" :price="item.price" class="absolute left-1 top-4" />
      <span
        v-else-if="savings > 0"
        class="candy-fill display absolute left-1 top-4 -rotate-6 rounded-2xl border px-3.5 py-1 text-[20px] shadow-hard-sm"
      >
        Tiết kiệm {{ formatVnd(savings) }}
      </span>
    </div>

    <div class="flex flex-col p-5 sm:p-6">
      <p class="text-xs font-extrabold uppercase tracking-[0.14em] text-eyebrow">★ Combo được chọn nhiều</p>
      <h3 class="display mt-1 text-[clamp(28px,3vw,36px)]">{{ combo.name }}</h3>
      <p v-if="combo.description" class="mt-1.5 text-[15px] text-ink-soft">{{ combo.description }}</p>

      <p class="mt-4 text-sm font-extrabold">Trong combo có:</p>
      <ul class="mt-2 space-y-2">
        <li v-for="part in combo.items" :key="part.productId" class="flex items-center gap-2.5 text-[15px] font-bold">
          <span class="grid size-8 shrink-0 place-items-center rounded-full border-2 bg-mango-soft text-sm font-extrabold">{{ part.qty }}</span>
          <span>{{ part.unit }} {{ part.name }}</span>
        </li>
      </ul>

      <div class="min-h-6 flex-1" />
      <div class="flex flex-wrap items-end justify-between gap-4 border-t-2 border-dashed border-line pt-4">
        <div>
          <PriceTag :item="item" unit="combo" size="lg" />
          <p v-if="!item.flashSale && combo.originalPrice > combo.price" class="text-sm font-semibold text-muted">mua lẻ <s>{{ formatVnd(combo.originalPrice) }}</s></p>
        </div>
        <CartControl :item="item" label="+ Thêm combo" size="lg" class="!w-[170px]" />
      </div>
    </div>
  </article>

  <article
    v-else
    class="grid grid-cols-[104px_1fr] gap-4 rounded-card border bg-white p-3 shadow-hard transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-hard-lg sm:grid-cols-[128px_1fr]"
  >
    <div class="relative">
      <ProductThumb :product="thumbProduct" square :show-label="false" :width="140" class="aspect-square rounded-[20px] border-2" :class="soldOut && 'grayscale'" />
      <span
        v-if="item.flashSale && !soldOut"
        class="display absolute -left-1.5 -top-1.5 -rotate-6 rounded-xl border-2 bg-mango px-2 text-[14px] shadow-hard-sm"
      >
        ⚡ Flash
      </span>
    </div>
    <div class="flex min-w-0 flex-col">
      <h3 class="display text-[21px]">{{ combo.name }}</h3>
      <p class="mt-0.5 line-clamp-2 text-[13px] font-semibold text-muted">
        {{ combo.items.map((p) => `${p.qty} ${p.unit} ${p.name}`).join(' + ') }}
      </p>
      <p v-if="savings > 0" class="mt-1 text-[13px] font-extrabold text-eyebrow">Tiết kiệm {{ formatVnd(savings) }}</p>
      <div class="mt-auto flex flex-wrap items-end justify-between gap-2 pt-2">
        <PriceTag :item="item" unit="combo" />
        <CartControl :item="item" />
      </div>
    </div>
  </article>
</template>
