<script setup lang="ts">
import type { FlashSaleInfo } from '~/domain/types'

/** Chili "⚡ −20%" sticker with slots left, tilted like the other stickers. The parent positions it. */
const props = defineProps<{ flash: FlashSaleInfo; price: number }>()
const percent = computed(() => Math.round(((props.price - props.flash.salePrice) / props.price) * 100))
</script>

<template>
  <span class="inline-flex -rotate-6 flex-col items-center rounded-2xl border bg-chili px-3 py-1.5 text-center text-ink shadow-hard-sm">
    <span class="display text-[20px]">⚡ −{{ percent }}%</span>
    <span v-if="flash.remaining !== null" class="text-[11px] font-bold">còn {{ flash.remaining }} suất</span>
  </span>
</template>
