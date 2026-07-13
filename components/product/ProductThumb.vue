<script setup lang="ts">
import type { CategoryId } from '~/domain/types'
import { monogram } from '~/utils/format'

/**
 * The gradient placeholder tile with a category-tinted background and a big
 * monogram. Shared by the product card and the share modal hero. Optional
 * play button + best-seller badge are toggled by the parent.
 */
withDefaults(
  defineProps<{
    category: CategoryId
    name: string
    /** Cover image; when set it replaces the gradient monogram placeholder. */
    thumbnail?: string
    /** Hint the browser to prioritise this image (e.g. above-the-fold). */
    eager?: boolean
    monoSize?: number
    showPlay?: boolean
    showBest?: boolean
    showImgTag?: boolean
  }>(),
  { monoSize: 96, showPlay: false, showBest: false, showImgTag: false, eager: false },
)

const emit = defineEmits<{ play: [] }>()
</script>

<template>
  <div class="thumb" :data-cat="category">
    <span v-if="showBest" class="best">★ Bán chạy</span>

    <img
      v-if="thumbnail"
      :src="thumbnail"
      :alt="name"
      class="cover"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      width="800"
      height="600"
    />
    <span v-else class="mono display" :style="{ fontSize: `${monoSize}px` }">
      {{ monogram(name) }}
    </span>

    <span v-if="showImgTag && !thumbnail" class="imgtag">Ảnh minh hoạ</span>
    <button
      v-if="showPlay"
      class="play"
      type="button"
      aria-label="Xem clip món ăn"
      @click.stop="emit('play')"
    >
      <IconPlay />
    </button>
  </div>
</template>

<style scoped>
.thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  display: grid;
  place-items: center;
}

.thumb[data-cat='chua'] {
  background: var(--thumb-chua);
}
.thumb[data-cat='lac'] {
  background: var(--thumb-lac);
}
.thumb[data-cat='say'] {
  background: var(--thumb-say);
}
.thumb[data-cat='banhtrang'] {
  background: var(--thumb-banhtrang);
}

.cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mono {
  color: var(--thumb-mono-color);
  line-height: 1;
}

.imgtag {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--faint);
  background: oklch(100% 0 0 / 0.7);
  padding: 4px 8px;
  border-radius: 6px;
}

[data-theme='dark'] .imgtag {
  color: var(--faint);
  background: oklch(15% 0.01 60 / 0.6);
}

.play {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--play-bg);
  border: 1px solid var(--play-border);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.play :deep(svg) {
  width: 16px;
  height: 16px;
  fill: var(--play-icon);
  margin-left: 2px;
}

.thumb:hover .play {
  background: var(--accent);
  border-color: var(--accent);
  transform: scale(1.08);
}

.thumb:hover .play :deep(svg) {
  fill: var(--accent-ink);
}

.best {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--best-bg);
  color: var(--best-ink);
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 999px;
  box-shadow: var(--shadow-sm);
}
</style>
