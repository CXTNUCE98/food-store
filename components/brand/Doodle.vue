<script setup lang="ts">
import { COLORS } from '~/design/tokens'

/**
 * Hand-drawn decorations sprinkled around sections, as on the banner:
 * outlined star, filled heart, 4-point sparkle and the "!!!" burst lines.
 * Purely decorative; the parent sizes and positions it.
 */
withDefaults(defineProps<{ kind?: 'star' | 'heart' | 'sparkle' | 'burst' }>(), { kind: 'star' })
</script>

<template>
  <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" :stroke="COLORS.ink" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path
      v-if="kind === 'star'"
      :fill="COLORS.mango"
      d="M16 3.5l3.6 7.6 8.3 1-6.1 5.8 1.6 8.3L16 22.1l-7.4 4.1 1.6-8.3-6.1-5.8 8.3-1z"
    />
    <path
      v-else-if="kind === 'heart'"
      :fill="COLORS['orange-deep']"
      d="M16 27.5S4 20.3 4 12.2C4 8.4 6.9 5.5 10.4 5.5c2.4 0 4.4 1.3 5.6 3.3 1.2-2 3.2-3.3 5.6-3.3 3.5 0 6.4 2.9 6.4 6.7 0 8.1-12 15.3-12 15.3z"
    />
    <path
      v-else-if="kind === 'sparkle'"
      :fill="COLORS.white"
      d="M16 3c1 7.2 5.8 12 13 13-7.2 1-12 5.8-13 13-1-7.2-5.8-12-13-13 7.2-1 12-5.8 13-13z"
    />
    <g v-else :stroke="COLORS.mango" stroke-width="3.2">
      <path d="M6 22 3 12" />
      <path d="M14 19 13 5" />
      <path d="M21 21l6-10" />
    </g>
  </svg>
</template>
