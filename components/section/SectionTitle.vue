<script setup lang="ts">
/**
 * Centered section heading: dashed eyebrow pill, then the title in chocolate
 * with its `accent` words in candy lettering. Extra lines go in the slot.
 */
defineProps<{ eyebrow: string; title: string; accent?: string }>()
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 class="display mt-4 text-[clamp(34px,4.8vw,54px)]">
      {{ title }}
      <CandyText v-if="accent" :text="accent" class="ml-1" />
    </h2>
    <slot />
  </div>
</template>
