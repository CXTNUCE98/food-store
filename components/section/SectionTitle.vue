<script setup lang="ts">
/**
 * Section heading: dashed eyebrow pill, then the title in chocolate with its
 * `accent` words in candy lettering. Centered by default; `start` aligns it
 * left. Extra lines go in the slot.
 */
withDefaults(defineProps<{ eyebrow: string; title: string; accent?: string; align?: 'center' | 'start'; titleId?: string }>(), {
  align: 'center',
})
</script>

<template>
  <div class="flex flex-col" :class="align === 'center' ? 'items-center text-center' : 'items-start'">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="titleId" class="display mt-4 text-[clamp(34px,4.8vw,54px)]">
      {{ title }}
      <CandyText v-if="accent" :text="accent" class="ml-1" />
    </h2>
    <slot />
  </div>
</template>
