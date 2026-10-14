<script setup lang="ts">
/** Round glossy-orange "★ Bán chạy" sticker with a dashed inner ring, tilted 12°. The parent positions it. */
withDefaults(defineProps<{ large?: boolean }>(), { large: false })
</script>

<template>
  <span
    class="candy-fill display grid rotate-12 place-items-center rounded-full border text-center shadow-hard-sm"
    :class="large ? 'size-[96px] text-[19px]' : 'size-[76px] text-[15px]'"
  >
    <span class="absolute inset-[5px] rounded-full border-2 border-dashed border-white/80" />
    <span class="leading-[1]"><span class="text-mango">★</span><br />Bán<br />chạy</span>
  </span>
</template>
