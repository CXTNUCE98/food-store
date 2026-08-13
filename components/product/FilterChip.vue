<script setup lang="ts">
defineProps<{ label: string; active: boolean; count?: number }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-pressed="active"
    class="flex-none cursor-pointer whitespace-nowrap rounded-full border-[1.5px] px-4 py-[10px] text-sm font-semibold transition-all duration-[180ms] active:scale-[0.95]"
    :class="
      active
        ? 'border-accent bg-accent text-accent-ink'
        : 'border-border bg-surface text-muted hover:border-accent hover:text-fg'
    "
    @click="$emit('select')"
  >
    {{ label }}
    <span v-if="count !== undefined" class="ml-1 text-[12px] opacity-70">· {{ count }}</span>
  </button>
</template>
