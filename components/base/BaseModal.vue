<script setup lang="ts">
/**
 * Reusable overlay shell. Owns the shared modal chrome (backdrop, centering,
 * click-outside + Escape to close) so PreviewModal / ShareCard only supply
 * their inner content via the default slot. Also locks background scroll and
 * traps Tab focus inside while open, restoring focus on close.
 */
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const rootRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

watch(
  () => props.open,
  (open) => {
    if (import.meta.client) {
      if (open) {
        lastFocused = document.activeElement as HTMLElement | null
        document.body.style.overflow = 'hidden'
        nextTick(() => rootRef.value?.focus())
      } else {
        document.body.style.overflow = ''
        lastFocused?.focus()
      }
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, video, [tabindex]:not([tabindex="-1"])'

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return

  if (e.key === 'Escape') {
    emit('close')
    return
  }

  // Keep Tab cycling inside the dialog.
  if (e.key === 'Tab' && rootRef.value) {
    const focusables = rootRef.value.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
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
      ref="rootRef"
      tabindex="-1"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--overlay-bg)] p-6 outline-none backdrop-blur-[6px]"
      @click.self="emit('close')"
    >
      <slot />
    </div>
  </Transition>
</template>
