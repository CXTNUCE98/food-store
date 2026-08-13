<script setup lang="ts">
import type { CategoryId } from '~/domain/types'
import { monogram } from '~/utils/format'

/**
 * The gradient placeholder tile with a category-tinted background and a big
 * monogram. Shared by the product card and the share modal hero. Optional
 * play button, best-seller badge and overlay chips are toggled by the parent.
 */
const props = withDefaults(
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
    /** Overlay chips on the tile: category label + taste tag (card view). */
    categoryLabel?: string
    taste?: string
  }>(),
  { monoSize: 96, showPlay: false, showBest: false, showImgTag: false, eager: false },
)

const emit = defineEmits<{ play: [] }>()

// Category background comes from a theme token, so it follows the active theme.
const bg = computed(() => `var(--thumb-${props.category})`)

// Fade the cover in once decoded so slow networks don't pop images in.
const loaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
onMounted(() => {
  if (imgRef.value?.complete) loaded.value = true
})
</script>

<template>
  <div
    class="group relative grid aspect-[4/3] place-items-center overflow-hidden"
    :style="{ background: bg }"
  >
    <span
      v-if="showBest"
      class="absolute left-3 top-3 z-[1] rounded-full bg-[var(--best-bg)] px-2.5 py-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--best-ink)] shadow-[0_0_14px_var(--best-glow)]"
    >
      ★ Bán chạy
    </span>

    <img
      v-if="thumbnail"
      ref="imgRef"
      :src="thumbnail"
      :alt="name"
      class="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-500 group-hover:scale-[1.06]"
      :class="loaded ? 'opacity-100' : 'opacity-0'"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      width="800"
      height="600"
      @load="loaded = true"
    />
    <span
      v-else
      class="display leading-none text-[var(--thumb-mono-color)]"
      :style="{ fontSize: `${monoSize}px` }"
    >
      {{ monogram(name) }}
    </span>

    <!-- Info chips over the tile (kept tiny so the photo stays the hero). -->
    <div v-if="categoryLabel || taste" class="absolute bottom-2.5 left-2.5 z-[1] flex flex-wrap gap-1.5">
      <span
        v-if="categoryLabel"
        class="rounded-md bg-black/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]"
      >
        {{ categoryLabel }}
      </span>
      <span
        v-if="taste"
        class="rounded-md bg-white/80 px-2 py-1 text-[10px] font-semibold text-muted backdrop-blur-[4px] dark:bg-[oklch(15%_0.01_60/0.7)]"
      >
        {{ taste }}
      </span>
    </div>

    <span
      v-if="showImgTag && !thumbnail"
      class="absolute bottom-2.5 right-2.5 rounded-md bg-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted dark:bg-[oklch(15%_0.01_60/0.6)]"
    >
      Ảnh minh hoạ
    </span>

    <button
      v-if="showPlay"
      type="button"
      aria-label="Xem clip món ăn"
      class="absolute right-3 top-3 grid size-11 cursor-pointer place-items-center rounded-full border border-[var(--play-border)] bg-[var(--play-bg)] shadow-soft-sm backdrop-blur-[6px] transition-[background,transform] duration-200 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent [&_svg]:ml-0.5 [&_svg]:size-4 [&_svg]:fill-[var(--play-icon)] group-hover:[&_svg]:fill-[var(--accent-ink)]"
      @click.stop="emit('play')"
    >
      <IconPlay />
    </button>
  </div>
</template>
