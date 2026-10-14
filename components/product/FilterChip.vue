<script setup lang="ts">
defineProps<{ label: string; active: boolean; count?: number }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-pressed="active"
    class="min-h-11 whitespace-nowrap rounded-full border px-5 text-[15px] font-extrabold shadow-hard-sm"
    :class="active ? 'candy-fill cursor-default' : 'press bg-white text-ink'"
    @click="$emit('select')"
  >
    {{ label }}<span v-if="count !== undefined" class="font-bold opacity-75"> · {{ count }}</span>
  </button>
</template>
