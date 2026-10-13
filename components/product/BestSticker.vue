<script setup lang="ts">
/** Round chili "★ Bán chạy" sticker, tilted 12°. The parent positions it. */
withDefaults(defineProps<{ large?: boolean }>(), { large: false })
</script>

<template>
  <span
    class="display grid rotate-12 place-items-center rounded-full border bg-chili text-center text-ink shadow-hard-sm"
    :class="large ? 'size-[92px] text-[19px]' : 'size-[74px] text-[15px]'"
  >
    <span class="leading-[0.95]">★<br />Bán<br />chạy</span>
  </span>
</template>
