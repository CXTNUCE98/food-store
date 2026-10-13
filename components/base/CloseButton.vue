<script setup lang="ts">
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    aria-label="Đóng"
    class="press grid size-11 shrink-0 place-items-center rounded-full border bg-white text-[26px] font-semibold leading-none text-ink shadow-hard-sm"
    @click="$emit('click')"
  >
    <span aria-hidden="true" class="-mt-0.5">×</span>
  </button>
</template>
