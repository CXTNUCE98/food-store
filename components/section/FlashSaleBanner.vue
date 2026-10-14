<script setup lang="ts">
import { formatVnd } from '~/utils/format'

/**
 * Flash sale, split in two while one runs: a glossy orange panel with the
 * name and a big day/hour/minute/second countdown, and a shelf of the
 * discounted items to add straight to the cart. Hidden otherwise.
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

const clock = computed(() => {
  let s = Math.max(0, Math.floor((new Date(sale.value?.endsAt ?? 0).getTime() - now.value) / 1000))
  const days = Math.floor(s / 86_400)
  s %= 86_400
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    ...(days ? [{ value: String(days), label: 'Ngày' }] : []),
    { value: pad(Math.floor(s / 3600)), label: 'Giờ' },
    { value: pad(Math.floor((s % 3600) / 60)), label: 'Phút' },
    { value: pad(s % 60), label: 'Giây' },
  ]
})

const percentOff = (price: number, sale: number) => Math.round(((price - sale) / price) * 100)
</script>

<template>
  <section v-if="sale && items.length" class="wrap pt-[clamp(48px,6vw,80px)]" aria-label="Flash sale">
    <div class="grid overflow-hidden rounded-hero border-[3px] shadow-hard-lg lg:grid-cols-[340px_1fr]">
      <div class="candy-fill relative flex flex-col justify-between gap-6 p-6 sm:p-7">
        <Doodle kind="burst" class="absolute right-5 top-4 size-11 rotate-12" />
        <div>
          <p class="inline-flex rounded-full border-2 bg-mango px-3 py-0.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink [text-shadow:none]">
            ⚡ Flash sale
          </p>
          <h2 class="display mt-3 text-[clamp(30px,3.6vw,42px)]">{{ sale.name }}</h2>
          <p class="mt-1 font-bold text-white/90">{{ items.length }} món đang giảm giá, số suất có hạn!</p>
        </div>

        <div class="[text-shadow:none]">
          <p class="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white/90">Kết thúc sau</p>
          <ClientOnly>
            <div class="mt-2 flex gap-2">
              <div v-for="part in clock" :key="part.label" class="w-[64px] rounded-2xl border bg-ink py-1.5 text-center text-paper shadow-hard-sm">
                <p class="display text-[28px] tabular-nums leading-tight">{{ part.value }}</p>
                <p class="text-[11px] font-extrabold uppercase text-mango">{{ part.label }}</p>
              </div>
            </div>
            <template #fallback><div class="mt-2 h-[68px]" /></template>
          </ClientOnly>
        </div>
      </div>

      <ul class="flex gap-4 overflow-x-auto border-t-[3px] bg-mango-soft p-5 lg:border-l-[3px] lg:border-t-0">
        <li
          v-for="item in items"
          :key="item.kind + item.id"
          class="flex w-[196px] shrink-0 flex-col rounded-[22px] border bg-white p-2.5 shadow-hard-sm"
        >
          <div class="relative">
            <ProductThumb :product="item" :show-label="false" :width="200" class="aspect-square rounded-2xl border-2" />
            <span class="display absolute -left-1 top-2 -rotate-6 rounded-xl border-2 bg-mango px-2 text-[16px] shadow-hard-sm">
              −{{ percentOff(item.price, item.flashSale!.salePrice) }}%
            </span>
          </div>
          <p class="mt-2.5 truncate px-1 font-extrabold leading-tight">{{ item.name }}</p>
          <p class="px-1 text-sm">
            <b class="display text-[20px] text-eyebrow">{{ formatVnd(item.flashSale!.salePrice) }}</b>
            <s class="ml-1 font-semibold text-muted">{{ formatVnd(item.price) }}</s>
          </p>
          <p v-if="item.flashSale!.remaining !== null" class="px-1 text-[12px] font-bold text-muted">🔥 còn {{ item.flashSale!.remaining }} suất</p>
          <CartControl :item="item" block class="mt-auto pt-2.5" />
        </li>
      </ul>
    </div>
  </section>
</template>
