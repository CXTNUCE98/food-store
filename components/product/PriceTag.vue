<script setup lang="ts">
import type { Sellable } from '~/domain/types'
import { formatVnd } from '~/utils/format'

/** Price block for cards: the flash price in red-orange with the regular price struck through. */
defineProps<{ item: Sellable; unit?: string; size?: 'md' | 'lg' }>()
</script>

<template>
  <p class="min-w-0 leading-tight">
    <template v-if="item.flashSale">
      <span class="display block text-eyebrow" :class="size === 'lg' ? 'text-[32px]' : 'text-[25px]'">{{ formatVnd(item.flashSale.salePrice) }}</span>
      <span class="text-sm font-bold text-muted"><s>{{ formatVnd(item.price) }}</s> / {{ unit ?? item.unit }}</span>
    </template>
    <template v-else>
      <span class="display block" :class="size === 'lg' ? 'text-[32px]' : 'text-[25px]'">{{ formatVnd(item.price) }}</span>
      <span class="text-sm font-bold text-muted">/ {{ unit ?? item.unit }}</span>
    </template>
  </p>
</template>
