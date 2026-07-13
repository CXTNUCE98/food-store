<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatPriceWithUnit } from '~/utils/format'

const props = defineProps<{ product: Product | null }>()
const emit = defineEmits<{ close: [] }>()

/** Decide how to embed: iframe for YouTube/Vimeo links, <video> for files. */
const isEmbed = computed(() =>
  props.product?.video ? /youtube|youtu\.be|vimeo/.test(props.product.video) : false,
)
</script>

<template>
  <BaseModal :open="!!product" @close="emit('close')">
    <div v-if="product" class="modal">
      <div class="m-video">
        <iframe
          v-if="product.video && isEmbed"
          :src="product.video"
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
        <video
          v-else-if="product.video"
          :src="product.video"
          controls
          autoplay
          playsinline
        />
        <div v-else class="ph">
          <div class="pbtn"><IconPlay /></div>
          <div class="ph-title">Clip đang cập nhật</div>
          <div class="ph-sub">
            Gắn link YouTube hoặc file mp4 vào trường <code>video</code> của món này
            trong <code>data/products.ts</code>.
          </div>
        </div>
      </div>
      <div class="m-head">
        <div>
          <h3 class="display">{{ product.name }}</h3>
          <div class="price display">{{ formatPriceWithUnit(product) }}</div>
        </div>
        <CloseButton @click="emit('close')" />
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

.m-video {
  aspect-ratio: 16 / 9;
  position: relative;
  background: var(--video-bg);
  display: grid;
  place-items: center;
}

.m-video iframe,
.m-video video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.ph {
  text-align: center;
  color: var(--muted);
  padding: 24px;
}

.pbtn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent);
  display: grid;
  place-items: center;
  margin: 0 auto 14px;
  box-shadow: var(--shadow-sm);
}

.pbtn :deep(svg) {
  width: 24px;
  height: 24px;
  fill: var(--accent-ink);
  margin-left: 3px;
}

.ph-title {
  font-weight: 700;
  color: var(--fg);
  margin-bottom: 4px;
}

.ph-sub {
  font-size: 13px;
}

.ph-sub code {
  background: var(--bg-2);
  padding: 1px 5px;
  border-radius: 5px;
}

.m-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 20px 22px;
}

.m-head h3 {
  font-size: 22px;
}

.price {
  color: var(--hot);
  margin-top: 4px;
}
</style>
