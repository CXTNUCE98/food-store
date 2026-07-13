<script setup lang="ts">
import { SITE } from '~/domain/constants'

/** Wordmark used in the header, footer and share card. `size` scales it. */
withDefaults(defineProps<{ size?: number; showSub?: boolean }>(), {
  size: 28,
  showSub: false,
})
</script>

<template>
  <span class="brand">
    <span class="logo display" :style="{ fontSize: `${size}px` }">
      {{ SITE.brandLead }} <b>{{ SITE.brandTail }}</b>
    </span>
    <span v-if="showSub" class="sub">Đồ ăn vặt</span>
  </span>
</template>

<style scoped>
.brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.logo {
  letter-spacing: 0.06em;
  color: var(--hot);
  line-height: 1;
}

.logo b {
  color: var(--accent);
}

.sub {
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--faint);
  font-weight: 600;
}
</style>
