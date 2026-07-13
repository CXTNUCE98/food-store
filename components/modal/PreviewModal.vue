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
    <div v-if="product" class="modal">
      <MediaGallery :product="product" />

      <div class="m-head">
        <div>
          <h3 class="display">{{ product.name }}</h3>
          <div class="price display">{{ formatPriceWithUnit(product) }}</div>
        </div>
        <CloseButton @click="emit('close')" />
      </div>

      <p class="m-desc">{{ product.description }}</p>

      <div class="m-foot">
        <AppButton variant="gold" @click="emit('snap', product)">
          <IconCamera />
          Chụp món này
        </AppButton>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  width: 100%;
  max-width: 720px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  box-shadow: var(--shadow);
  animation: pop 0.22s ease;
}

@keyframes pop {
  from {
    transform: scale(0.96);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.m-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 22px 0;
}

.m-head h3 {
  font-size: 22px;
}

.price {
  color: var(--hot);
  margin-top: 4px;
}

.m-desc {
  color: var(--muted);
  font-size: 14px;
  padding: 10px 22px 0;
}

.m-foot {
  padding: 16px 22px 22px;
}

.m-foot :deep(.btn) {
  width: 100%;
  justify-content: center;
}
</style>
