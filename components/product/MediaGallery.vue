<script setup lang="ts">
import type { Product } from '~/domain/types'
import { buildMediaGallery, toEmbedUrl } from '~/utils/media'

/**
 * Product preview gallery.
 * - The main stage shows the active item: video (iframe/mp4) or a full image.
 * - Video is placed first, so it is what visitors see by default.
 * - A thumbnail strip lets them jump to any image (or back to the video).
 * The video only mounts once the visitor actually selects it, so opening the
 * preview never autoloads a heavy embed.
 */
import { postYouTubeCommand } from '~/utils/media'

const props = defineProps<{ product: Product }>()

const items = computed(() => buildMediaGallery(props.product))
const activeIndex = ref(0)

const active = computed(() => items.value[activeIndex.value])
const activeEmbed = computed(() =>
  active.value?.kind === 'video' ? toEmbedUrl(active.value.src) : null,
)

// enablejsapi=1 lets us drive play/pause via postMessage from our own button.
const embedSrc = computed(() =>
  activeEmbed.value
    ? `${activeEmbed.value}?autoplay=1&rel=0&enablejsapi=1&playsinline=1`
    : '',
)

const iframeRef = ref<HTMLIFrameElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(true)

/** Toggle the currently playing video, whether it's a YouTube embed or mp4. */
function togglePlay() {
  if (activeEmbed.value) {
    postYouTubeCommand(iframeRef.value, isPlaying.value ? 'pauseVideo' : 'playVideo')
    isPlaying.value = !isPlaying.value
  } else if (videoRef.value) {
    if (videoRef.value.paused) videoRef.value.play()
    else videoRef.value.pause()
    isPlaying.value = !videoRef.value.paused
  }
}

function select(index: number) {
  activeIndex.value = index
  isPlaying.value = true // a freshly-selected video autoplays
}

// Reset to the first item (the video, when present) whenever the product swaps.
watch(
  () => props.product.id,
  () => {
    activeIndex.value = 0
    isPlaying.value = true
  },
)
</script>

<template>
  <div class="flex flex-col">
    <div
      class="relative grid aspect-video place-items-center overflow-hidden bg-[var(--video-bg)] [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:size-full [&_iframe]:border-0 [&_video]:absolute [&_video]:inset-0 [&_video]:size-full [&_video]:border-0"
    >
      <template v-if="active?.kind === 'video'">
        <iframe
          v-if="activeEmbed"
          ref="iframeRef"
          :src="embedSrc"
          title="Video món ăn"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
        <video v-else ref="videoRef" :src="active.src" controls autoplay playsinline />

        <button
          type="button"
          class="absolute bottom-3.5 right-3.5 z-[2] grid size-12 cursor-pointer place-items-center rounded-full border-0 bg-black/55 text-white backdrop-blur-[4px] transition-[background,transform] duration-150 hover:scale-105 hover:bg-accent hover:text-accent-ink [&_svg]:size-[22px]"
          :aria-label="isPlaying ? 'Tạm dừng' : 'Phát'"
          @click="togglePlay"
        >
          <IconPause v-if="isPlaying" />
          <IconPlay v-else />
        </button>
      </template>

      <img
        v-else-if="active"
        :src="active.src"
        :alt="product.name"
        class="size-full object-cover"
      />

      <div v-else class="p-6 text-center text-muted">
        <div
          class="mx-auto mb-3.5 grid size-16 place-items-center rounded-full bg-accent shadow-soft-sm [&_svg]:ml-[3px] [&_svg]:size-6 [&_svg]:fill-[var(--accent-ink)]"
        >
          <IconPlay />
        </div>
        <p class="mb-1 font-bold text-fg">Ảnh/clip đang cập nhật</p>
        <p class="text-[13px] [&_code]:rounded [&_code]:bg-bg-2 [&_code]:px-[5px] [&_code]:py-px">
          Thêm <code>video_url</code>, <code>thumbnail_url</code> hoặc
          <code>images</code> cho món này trong <code>data/products.ts</code>.
        </p>
      </div>
    </div>

    <div v-if="items.length > 1" class="flex gap-2.5 overflow-x-auto p-4 [scrollbar-width:thin]">
      <button
        v-for="(item, i) in items"
        :key="i"
        type="button"
        class="relative aspect-[4/3] w-[84px] flex-none cursor-pointer overflow-hidden rounded-[10px] border-2 bg-bg-2 transition-[border-color,transform] duration-[180ms] hover:-translate-y-0.5 [&_img]:size-full [&_img]:object-cover"
        :class="i === activeIndex ? 'border-accent' : 'border-transparent'"
        :aria-label="item.kind === 'video' ? 'Xem clip' : `Xem ảnh ${i}`"
        @click="select(i)"
      >
        <img :src="item.poster" :alt="`${product.name} — ${item.kind}`" loading="lazy" />
        <span
          v-if="item.kind === 'video'"
          class="absolute inset-0 grid place-items-center bg-black/40 [&_svg]:size-[22px] [&_svg]:fill-white"
        >
          <IconPlay />
        </span>
      </button>
    </div>
  </div>
</template>
