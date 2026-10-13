<script setup lang="ts">
import { formatVnd } from '~/utils/format'

/**
 * Chili strip shown while a flash sale runs: name, live countdown and the
 * discounted items as quick-add chips. Hidden otherwise.
 */
const { runningFlash, products, combos, toSellable } = useCatalog()
const now = useNow()

const sale = computed(() => runningFlash.value[0] ?? null)
const items = computed(() =>
  [
    ...combos.value.map((c) => toSellable('COMBO', c)),
    ...products.value.map((p) => toSellable('PRODUCT', p)),
  ].filter((i) => i.flashSale && i.flashSale.flashSaleId === sale.value?.id),
)
const { increment, qtyOf } = useCart()
</script>

<template>
  <section v-if="sale && items.length" class="wrap pb-10" aria-label="Flash sale">
    <div class="rounded-hero border-[3px] bg-chili p-5 shadow-hard-lg sm:p-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-[13px] font-bold uppercase tracking-[0.16em]">⚡ Flash sale</p>
          <h2 class="display mt-2 text-[clamp(30px,4vw,44px)]">{{ sale.name }}</h2>
        </div>
        <div class="rounded-2xl border bg-ink px-4 py-2 text-paper">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-paper/70">Kết thúc sau</p>
          <ClientOnly>
            <p class="display text-[30px] tabular-nums">{{ formatCountdown(sale.endsAt, now) }}</p>
            <template #fallback><p class="display text-[30px]">--:--:--</p></template>
          </ClientOnly>
        </div>
      </div>

      <ul class="mt-5 flex gap-3 overflow-x-auto pb-1">
        <li v-for="item in items" :key="item.kind + item.id" class="flex shrink-0 items-center gap-3 rounded-2xl border bg-white p-2 pr-3">
          <ProductThumb :product="item" :show-label="false" :width="64" class="size-14 rounded-xl border-2" />
          <div>
            <p class="max-w-[16ch] truncate font-bold leading-tight">{{ item.name }}</p>
            <p class="text-sm"><b class="text-chili">{{ formatVnd(item.flashSale!.salePrice) }}</b> <s class="text-muted">{{ formatVnd(item.price) }}</s></p>
            <p v-if="item.flashSale!.remaining !== null" class="text-[11px] font-semibold text-muted">còn {{ item.flashSale!.remaining }} suất</p>
          </div>
          <button
            type="button"
            class="press grid size-10 place-items-center rounded-full border bg-lime text-[22px] font-bold shadow-hard-sm disabled:opacity-40"
            :disabled="item.available <= qtyOf(item)"
            :aria-label="`Thêm ${item.name} vào giỏ`"
            @click="increment(item)"
          >
            +
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
