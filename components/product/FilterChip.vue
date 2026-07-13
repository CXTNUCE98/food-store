<script setup lang="ts">
defineProps<{ label: string; active: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    class="chip"
    :class="{ active }"
    type="button"
    :aria-pressed="active"
    @click="$emit('select')"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.chip {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
}

.chip:hover {
  color: var(--fg);
  border-color: var(--accent);
}

.chip.active {
  background: var(--accent);
  color: var(--accent-ink);
  border-color: var(--accent);
}
</style>
