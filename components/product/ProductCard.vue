<script setup lang="ts">
import type { Product } from '~/domain/types'

/**
 * Menu card, served like the banner's dishes: the photo on a round wooden
 * plate popping out of the top of the card, then taste tags, name, blurb,
 * price and add-to-cart. The parent leaves room above for the plate.
 * The whole card (plate included) opens the detail popup; the name is the
 * real button, stretched over the card, and the cart controls sit above it.
 */
const props = defineProps<{ product: Product }>()

const { toSellable } = useCatalog()
const { openDetail } = useOverlays()
const item = computed(() => toSellable('PRODUCT', props.product))
const soldOut = computed(() => item.value.available <= 0)
const open = () => openDetail('PRODUCT', props.product.id)
</script>

<template>
  <article
    class="group relative flex h-full flex-col items-center rounded-[22px] border bg-white px-2.5 pb-3 text-center shadow-hard sm:rounded-card sm:px-4 sm:pb-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard-lg"
  >
    <div class="relative -mt-12 w-[min(170px,80%)] cursor-pointer sm:-mt-14 sm:w-[min(170px,72%)]" @click="open">
      <span class="wood block aspect-square rounded-full border-[3px] p-[8%] shadow-hard-sm">
        <ProductThumb :product="product" square :show-label="false" :width="200" class="size-full rounded-full border-2" :class="soldOut && 'grayscale'" />
      </span>
      <BestSticker v-if="product.featured" class="absolute -right-4 -top-2 scale-90 sm:-right-6 sm:-top-1 sm:scale-100" />
      <FlashSticker v-if="item.flashSale && !soldOut" :flash="item.flashSale" :price="item.price" class="absolute -left-3 bottom-0 scale-90 sm:-left-7 sm:bottom-1 sm:scale-100" />
      <span v-if="soldOut" class="display absolute inset-x-0 bottom-1 mx-auto w-fit -rotate-3 rounded-full border bg-white px-3 py-0.5 text-[15px]">
        Tạm hết
      </span>
      <span
        v-else
        aria-hidden="true"
        class="absolute inset-x-0 bottom-1 mx-auto w-fit translate-y-1 rounded-full border-2 bg-white px-3 py-0.5 text-[12px] font-extrabold opacity-0 shadow-hard-sm transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden"
      >
        Xem chi tiết
      </span>
    </div>

    <h4 class="display mt-3 text-[18px] sm:mt-4 sm:text-[22px]">
      <button
        type="button"
        class="cursor-pointer transition-colors after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] group-hover:text-orange-deep"
        :aria-label="`Xem chi tiết ${product.name}`"
        @click="open"
      >
        {{ product.name }}
      </button>
    </h4>
    <p v-if="product.taste" class="mt-1 flex flex-wrap justify-center gap-1.5 text-xs font-extrabold">
      <span v-for="t in product.taste.split('·')" :key="t" class="rounded-full border-2 border-dashed bg-paper px-2.5 py-0.5">{{ t.trim() }}</span>
    </p>
    <p class="mt-2 line-clamp-3 flex-1 text-[13px] text-muted sm:text-sm">{{ product.summary }}</p>

    <div class="relative z-10 mt-3 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t-2 border-dashed border-line pt-3 sm:mt-4 sm:justify-between sm:pt-3.5 sm:text-left">
      <!-- Unit sits under the price so it reads the same at every card width. -->
      <PriceTag :item="item" />
      <CartControl :item="item" />
    </div>
  </article>
</template>
