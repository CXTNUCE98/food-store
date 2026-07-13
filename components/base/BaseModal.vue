<script setup lang="ts">
/**
 * Reusable overlay shell. Owns the shared modal chrome (backdrop, centering,
 * click-outside + Escape to close) so PreviewModal / ShareCard only supply
 * their inner content via the default slot.
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
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--overlay-bg)] p-6 backdrop-blur-[6px]"
      @click.self="emit('close')"
    >
      <slot />
    </div>
  </Transition>
</template>
