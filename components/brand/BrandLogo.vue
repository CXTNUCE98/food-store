<script setup lang="ts">
/**
 * Wordmark: the brand name (site.config) in glossy candy lettering, with a
 * small wooden "shop" plank hanging off the end. `size` is the font size in px.
 */
withDefaults(defineProps<{ size?: number }>(), { size: 26 })
const { site } = useCatalog()
</script>

<template>
  <span class="inline-flex items-end" :style="{ fontSize: `${size}px` }">
    <CandyText :text="`${site.brandLead} ${site.brandTail}`" class="leading-none" />
    <span
      class="wood display -mb-[0.1em] ml-[0.3em] rotate-[-6deg] rounded-[0.3em] border-2 px-[0.35em] pt-[0.12em] text-[0.42em] leading-[1.25] tracking-[0.06em] text-ink"
    >
      shop
    </span>
  </span>
</template>
