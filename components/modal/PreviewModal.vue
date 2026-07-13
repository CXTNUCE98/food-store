<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatPriceWithUnit } from '~/utils/format'

/**
 * Product preview overlay. Shows the media gallery (video-first, then images)
 * plus name/price and a jump to the share card for closing the order.
 */
defineProps<{ product: Product | null }>()
const emit = defineEmits<{ close: []; snap: [Product] }>()
</script>

<template>
  <BaseModal :open="!!product" @close="emit('close')">
    <div
      v-if="product"
      class="max-h-[calc(100vh-48px)] w-full max-w-[720px] animate-pop overflow-y-auto overflow-x-hidden rounded-[22px] border border-border bg-surface shadow-soft"
    >
      <MediaGallery :product="product" />

      <div class="flex items-start justify-between gap-3.5 px-[22px] pt-[18px]">
        <div>
          <h3 class="display text-[22px]">{{ product.name }}</h3>
          <div class="display mt-1 text-hot">{{ formatPriceWithUnit(product) }}</div>
        </div>
        <CloseButton @click="emit('close')" />
      </div>

      <p class="px-[22px] pt-2.5 text-sm text-muted">{{ product.description }}</p>

      <div class="px-[22px] pb-[22px] pt-4 [&>*]:w-full [&>*]:justify-center">
        <AppButton variant="gold" @click="emit('snap', product)">
          <IconCamera />
          Chụp món này
        </AppButton>
      </div>
    </div>
  </BaseModal>
</template>
