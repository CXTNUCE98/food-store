<script setup lang="ts">
/**
 * Reusable overlay shell for the cart drawer and the order-image modal. Owns
 * the ink backdrop, click-outside + Escape to close, and Tab focus trapping,
 * restoring focus on close. `side` picks a right-hand drawer or a centered
 * panel; the slide/pop animation lives in main.css (.overlay-*).
 * Page scroll locking is handled once in the layout.
 */
const props = withDefaults(
  defineProps<{
    open: boolean
    /** Accessible name of the dialog. */
    label: string
    side?: 'center' | 'right'
  }>(),
  { side: 'center' },
)
const emit = defineEmits<{ close: [] }>()

const panelRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

watch(
  () => props.open,
  (open) => {
    if (!import.meta.client) return
    if (open) {
      lastFocused = document.activeElement as HTMLElement | null
      nextTick(() => panelRef.value?.focus())
    } else if (lastFocused?.isConnected) {
      lastFocused.focus()
    }
  },
)

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return

  if (e.key === 'Escape') {
    emit('close')
    return
  }

  // Keep Tab cycling inside the dialog.
  if (e.key === 'Tab' && panelRef.value) {
    const focusables = panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.value)) {
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
  <Transition name="overlay" :duration="260">
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex bg-ink/55"
      :class="side === 'right' ? 'justify-end' : 'overflow-y-auto p-4'"
      @click.self="emit('close')"
    >
      <div
        ref="panelRef"
        :data-panel="side"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        tabindex="-1"
        class="outline-none"
        :class="side === 'right' ? 'h-full w-full max-w-[440px]' : 'm-auto w-full max-w-[480px]'"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>
