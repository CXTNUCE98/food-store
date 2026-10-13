<script setup lang="ts">
import type { Product } from '~/domain/types'
import { CATEGORY_COLORS } from '~/design/tokens'

/**
 * Product photo, or — until a real photo exists — diagonal stripes in the
 * category colour with a monospace "ảnh · slug" label. The parent sets the
 * size/aspect ratio and the ink border.
 */
const props = withDefaults(
  defineProps<{
    product: Product
    /** Hint the browser to prioritise this image (e.g. above the fold). */
    eager?: boolean
    /** Show the "ảnh · slug" label on the placeholder (off for tiny thumbs). */
    showLabel?: boolean
  }>(),
  { eager: false, showLabel: true },
)

const stripes = computed(() => {
  const c = CATEGORY_COLORS[props.product.category]
  const tint = `color-mix(in srgb, ${c} 45%, white)`
  return `repeating-linear-gradient(-45deg, ${c} 0 14px, ${tint} 14px 28px)`
})
</script>

<template>
  <div class="relative overflow-hidden bg-white" :style="product.thumbnail_url ? undefined : { background: stripes }">
    <img
      v-if="product.thumbnail_url"
      :src="product.thumbnail_url"
      :alt="product.name"
      class="absolute inset-0 size-full object-cover"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      width="800"
      height="600"
    />
    <span
      v-else-if="showLabel"
      class="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-md border-2 bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-ink"
    >
      ảnh · {{ product.id }}
    </span>
  </div>
</template>
