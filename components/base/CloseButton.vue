<script setup lang="ts">
withDefaults(defineProps<{ small?: boolean }>(), { small: false })
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    aria-label="Đóng"
    class="flex shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-border bg-surface leading-none text-fg transition-colors hover:bg-bg-2"
    :class="small ? 'size-8 text-[18px]' : 'size-[38px] text-[20px]'"
    @click="$emit('click')"
  >
    ×
  </button>
</template>
