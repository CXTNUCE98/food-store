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
  <div class="gallery">
    <div class="stage">
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
          class="toggle-play"
          type="button"
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
        class="stage-img"
      />

      <div v-else class="stage-empty">
        <div class="pbtn"><IconPlay /></div>
        <p class="empty-title">Ảnh/clip đang cập nhật</p>
        <p class="empty-sub">
          Thêm <code>video_url</code>, <code>thumbnail_url</code> hoặc
          <code>images</code> cho món này trong <code>data/products.ts</code>.
        </p>
      </div>
    </div>

    <div v-if="items.length > 1" class="strip">
      <button
        v-for="(item, i) in items"
        :key="i"
        class="thumb-btn"
        :class="{ active: i === activeIndex }"
        type="button"
        :aria-label="item.kind === 'video' ? 'Xem clip' : `Xem ảnh ${i}`"
        @click="select(i)"
      >
        <img :src="item.poster" :alt="`${product.name} — ${item.kind}`" loading="lazy" />
        <span v-if="item.kind === 'video'" class="play-badge"><IconPlay /></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
}

.stage {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--video-bg);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.stage iframe,
.stage video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.stage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Our own play/pause control, sitting above the embed so a single tap works
   even when the player's native control bar is hidden. */
.toggle-play {
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 2;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: oklch(0% 0 0 / 0.55);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background 0.18s, transform 0.15s;
}

.toggle-play:hover {
  background: var(--accent);
  color: var(--accent-ink);
  transform: scale(1.06);
}

.toggle-play :deep(svg) {
  width: 22px;
  height: 22px;
}

.stage-empty {
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

.empty-title {
  font-weight: 700;
  color: var(--fg);
  margin-bottom: 4px;
}

.empty-sub {
  font-size: 13px;
}

.empty-sub code {
  background: var(--bg-2);
  padding: 1px 5px;
  border-radius: 5px;
}

/* Thumbnail strip */
.strip {
  display: flex;
  gap: 10px;
  padding: 14px 16px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.thumb-btn {
  position: relative;
  flex: 0 0 auto;
  width: 84px;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  background: var(--bg-2);
  transition: border-color 0.18s, transform 0.18s;
}

.thumb-btn:hover {
  transform: translateY(-2px);
}

.thumb-btn.active {
  border-color: var(--accent);
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-badge {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: oklch(0% 0 0 / 0.4);
}

.play-badge :deep(svg) {
  width: 22px;
  height: 22px;
  fill: #fff;
}
</style>
