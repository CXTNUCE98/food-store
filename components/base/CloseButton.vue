<script setup lang="ts">
withDefaults(defineProps<{ small?: boolean }>(), { small: false })
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="x"
    :class="{ small }"
    type="button"
    aria-label="Đóng"
    @click="$emit('click')"
  >
    ×
  </button>
</template>

<style scoped>
.x {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
}

.x:hover {
  background: var(--bg-2);
}

.x.small {
  width: 32px;
  height: 32px;
  font-size: 18px;
}
</style>
