<script setup lang="ts">
import { SITE } from '~/domain/constants'

/**
 * Sticker wordmark: "TÓP" on an ink block tilted left, "TÉP" on a lime block
 * tilted right. `size` is the font size in px.
 */
withDefaults(defineProps<{ size?: number }>(), { size: 22 })
</script>

<template>
  <span class="inline-flex items-center" :style="{ fontSize: `${size}px` }">
    <span class="display -rotate-[4deg] rounded-[0.4em] bg-ink px-[0.35em] pb-[0.18em] pt-[0.26em] text-paper">
      {{ SITE.brandLead }}
    </span>
    <span
      class="display -ml-[0.12em] rotate-[3deg] rounded-[0.4em] border bg-lime px-[0.35em] pb-[0.14em] pt-[0.22em] text-ink"
    >
      {{ SITE.brandTail }}
    </span>
  </span>
</template>
