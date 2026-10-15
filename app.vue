<script setup lang="ts">
import { useIsFetching } from '@tanstack/vue-query'
import { COLORS } from '~/design/tokens'

/**
 * Top progress bar: Nuxt drives it on page changes; we also run it while a query has
 * nothing to show yet (first menu load, order lookup…). Background refetches of data
 * already on screen don't count, so the home page's minute-by-minute refresh stays quiet.
 */
const waiting = useIsFetching({ predicate: (q) => q.state.data === undefined })
if (import.meta.client) {
  const bar = useLoadingIndicator()
  watch(waiting, (n, before) => {
    if (n && !before) bar.start()
    else if (!n && before) bar.finish()
  })
}
</script>

<template>
  <NuxtLoadingIndicator :color="`linear-gradient(90deg, ${COLORS['orange-light']}, ${COLORS.orange}, ${COLORS['orange-deep']})`" :height="4" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
