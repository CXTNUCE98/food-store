<script setup lang="ts">
/**
 * Reusable overlay shell. Owns the shared modal chrome (backdrop, centering,
 * click-outside + Escape to close) so VideoModal / ShareCard only supply their
 * inner content via the default slot.
 */
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="overlay">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--overlay-bg);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.18s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
