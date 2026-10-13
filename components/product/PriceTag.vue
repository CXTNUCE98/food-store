<script setup lang="ts">
import type { Sellable } from '~/domain/types'
import { formatVnd } from '~/utils/format'

/** Price block for cards: the flash price in chili with the regular price struck through. */
defineProps<{ item: Sellable; unit?: string; size?: 'md' | 'lg' }>()
</script>

<template>
  <p class="min-w-0">
    <template v-if="item.flashSale">
      <span class="display block text-chili" :class="size === 'lg' ? 'text-[30px]' : 'text-[24px]'">{{ formatVnd(item.flashSale.salePrice) }}</span>
      <span class="text-sm font-semibold text-muted"><s>{{ formatVnd(item.price) }}</s> / {{ unit ?? item.unit }}</span>
    </template>
    <template v-else>
      <span class="display block" :class="size === 'lg' ? 'text-[30px]' : 'text-[24px]'">{{ formatVnd(item.price) }}</span>
      <span class="text-sm font-semibold text-muted">/ {{ unit ?? item.unit }}</span>
    </template>
  </p>
</template>
