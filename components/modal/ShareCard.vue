<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatPriceWithUnit } from '~/utils/format'

defineProps<{ product: Product | null }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <BaseModal :open="!!product" @close="emit('close')">
    <div v-if="product" class="share-card">
      <div class="sc-top">
        <BrandLogo :size="22" />
        <CloseButton small @click="emit('close')" />
      </div>

      <ProductThumb
        class="sc-hero"
        :category="product.category"
        :name="product.name"
        :mono-size="88"
      />

      <div class="sc-info">
        <h3 class="display">{{ product.name }}</h3>
        <p class="desc">{{ product.description }}</p>
        <div class="price display">{{ formatPriceWithUnit(product) }}</div>
      </div>

      <div class="sc-note">
        📸 <b>Chụp màn hình thẻ này</b> rồi gửi qua Messenger/Zalo để chốt đơn nhé.
      </div>

      <div class="sc-foot">
        <ContactButtons />
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.share-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  width: 100%;
  max-width: 420px;
  overflow: hidden;
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

.sc-top {
  padding: 20px 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sc-hero {
  margin: 16px 22px 0;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
}

.sc-info {
  padding: 18px 22px 4px;
}

.sc-info h3 {
  font-size: 24px;
}

.sc-info .desc {
  color: var(--muted);
  font-size: 14px;
  margin: 6px 0 10px;
}

.sc-info .price {
  color: var(--hot);
  font-size: 22px;
}

.sc-note {
  margin: 8px 22px 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--bg-2);
  border: 1.5px dashed var(--accent);
  font-size: 13px;
  color: var(--muted);
}

.sc-note b {
  color: var(--fresh);
}

.sc-foot {
  padding: 16px 22px 22px;
  display: flex;
  gap: 10px;
}

.sc-foot :deep(.btn) {
  flex: 1;
  justify-content: center;
  font-size: 14px;
  padding: 11px 14px;
}
</style>
