<script setup lang="ts">
import { SITE } from '~/domain/constants'

/** Wordmark used in the header, footer and share card. `size` scales it. */
withDefaults(defineProps<{ size?: number; showSub?: boolean }>(), {
  size: 28,
  showSub: false,
})
</script>

<template>
  <span class="flex items-baseline gap-2.5">
    <span
      class="display leading-none tracking-[0.06em] text-hot [&_b]:text-accent"
      :style="{ fontSize: `${size}px` }"
    >
      {{ SITE.brandLead }} <b>{{ SITE.brandTail }}</b>
    </span>
    <span
      v-if="showSub"
      class="text-[11px] font-semibold uppercase tracking-[0.24em] text-faint"
    >
      Đồ ăn vặt
    </span>
  </span>
</template>
