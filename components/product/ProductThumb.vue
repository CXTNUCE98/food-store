<script setup lang="ts">
/**
 * Product photo, or — until a real photo exists — diagonal stripes in the
 * category colour with a monospace "ảnh · slug" label. The parent sets the
 * size/aspect ratio and the ink border. Works for products and combos.
 */
const props = withDefaults(
  defineProps<{
    product: { id: string; name: string; category: string; thumbnail_url?: string }
    /** Hint the browser to prioritise this image (e.g. above the fold). */
    eager?: boolean
    /** Show the "ảnh · slug" label on the placeholder (off for tiny thumbs). */
    showLabel?: boolean
    /** Crop to a square (round plates) instead of the 4:3 card shape. */
    square?: boolean
    /** Rendered width in px, used to request a right-sized Cloudinary image. */
    width?: number
  }>(),
  { eager: false, showLabel: true, square: false, width: 600 },
)

const { categoryColor } = useCatalog()

const stripes = computed(() => {
  const c = categoryColor(props.product.category)
  const tint = `color-mix(in srgb, ${c} 45%, white)`
  return `repeating-linear-gradient(-45deg, ${c} 0 14px, ${tint} 14px 28px)`
})

/** Cloudinary photos are resized/compressed on the fly; other URLs pass through. */
const src = computed(() => {
  const url = props.product.thumbnail_url
  if (url?.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,c_fill,ar_${props.square ? '1:1' : '4:3'},w_${props.width * 2}/`)
  }
  return url
})
</script>

<template>
  <div class="relative overflow-hidden bg-white" :style="product.thumbnail_url ? undefined : { background: stripes }">
    <img
      v-if="src"
      :src="src"
      :alt="product.name"
      class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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
    <slot />
  </div>
</template>
