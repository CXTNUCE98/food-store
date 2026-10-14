<script setup lang="ts">
import type { VideoInfo } from '~/domain/types'

/**
 * Embedded product video (YouTube / TikTok / Facebook): TikTok plays portrait,
 * the others landscape. A TikTok short link has no embeddable id, so it turns
 * into a link out instead. The parent styles the frame (border, radius, shadow).
 */
const props = defineProps<{ video: VideoInfo; title: string }>()

const PROVIDERS = { youtube: 'YouTube', tiktok: 'TikTok', facebook: 'Facebook' } as const
const portrait = computed(() => props.video.provider === 'tiktok')
const embeddable = computed(() => props.video.embedUrl !== props.video.url)
</script>

<template>
  <div class="relative overflow-hidden bg-ink" :class="portrait ? 'mx-auto aspect-[9/16] h-[min(520px,58dvh)]' : 'aspect-video w-full'">
    <iframe
      v-if="embeddable"
      :src="video.embedUrl"
      :title="title"
      class="absolute inset-0 size-full"
      loading="lazy"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    />
    <a
      v-else
      :href="video.url"
      target="_blank"
      rel="noopener"
      class="absolute inset-0 grid place-items-center p-4 text-center font-bold text-paper underline-offset-4 hover:underline"
    >
      ▶ Xem video trên {{ PROVIDERS[video.provider] }}
    </a>
  </div>
</template>
