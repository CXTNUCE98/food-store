<script setup lang="ts">
defineProps<{ label: string; active: boolean; count?: number }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-pressed="active"
    class="min-h-10 whitespace-nowrap rounded-full border px-4 text-sm font-bold"
    :class="active ? 'cursor-default bg-ink text-paper' : 'press bg-white text-ink shadow-hard-sm'"
    @click="$emit('select')"
  >
    {{ label }}<span v-if="count !== undefined" class="font-semibold opacity-70"> · {{ count }}</span>
  </button>
</template>
