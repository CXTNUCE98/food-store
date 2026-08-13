<script setup lang="ts">
defineProps<{ label: string; active: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-pressed="active"
    class="cursor-pointer whitespace-nowrap rounded-full border-[1.5px] px-4 py-[10px] text-sm font-semibold transition-all duration-[180ms] active:scale-[0.95]"
    :class="
      active
        ? 'border-accent bg-accent text-accent-ink'
        : 'border-border bg-surface text-muted hover:border-accent hover:text-fg'
    "
    @click="$emit('select')"
  >
    {{ label }}
  </button>
</template>
