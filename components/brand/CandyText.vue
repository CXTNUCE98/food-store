<script setup lang="ts">
/**
 * Glossy orange lettering from the brand banner: gradient fill, white rim,
 * chocolate outline with a 3D drop. The two back layers are decorative copies
 * (aria-hidden); the front copy is the real, readable text. Size it with a
 * font-size on the component. Styles live in main.css (.candy*).
 */
defineProps<{ text: string | number }>()
</script>

<template>
  <span class="candy display">
    <span class="candy-rim" aria-hidden="true">{{ text }}</span>
    <span class="candy-ring" aria-hidden="true">{{ text }}</span>
    <span class="candy-face">{{ text }}</span>
  </span>
</template>
