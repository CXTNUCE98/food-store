<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatPriceWithUnit } from '~/utils/format'

defineProps<{ product: Product | null }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <BaseModal :open="!!product" @close="emit('close')">
    <div
      v-if="product"
      class="w-full max-w-[420px] animate-pop overflow-hidden rounded-[22px] border border-border bg-surface shadow-soft"
    >
      <div class="flex items-center justify-between px-[22px] pt-5">
        <BrandLogo :size="22" />
        <CloseButton small @click="emit('close')" />
      </div>

      <ProductThumb
        class="mx-[22px] mt-4 aspect-[4/3] overflow-hidden rounded-2xl"
        :category="product.category"
        :name="product.name"
        :thumbnail="product.thumbnail_url"
        :mono-size="88"
      />

      <div class="px-[22px] pb-1 pt-[18px]">
        <h3 class="display text-2xl">{{ product.name }}</h3>
        <p class="my-2.5 text-sm text-muted">{{ product.description }}</p>
        <div class="display text-[22px] text-hot">{{ formatPriceWithUnit(product) }}</div>
      </div>

      <div
        class="mx-[22px] mt-2 rounded-xl border-[1.5px] border-dashed border-accent bg-bg-2 px-3.5 py-3 text-[13px] text-muted [&_b]:text-fresh"
      >
        📸 <b>Chụp màn hình thẻ này</b> rồi gửi qua Messenger/Zalo để chốt đơn nhé.
      </div>

      <div class="flex gap-2.5 px-[22px] pb-[22px] pt-4 [&>*]:flex-1 [&>*]:justify-center">
        <ContactButtons />
      </div>
    </div>
  </BaseModal>
</template>
