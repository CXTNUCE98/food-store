<script setup lang="ts">
/** Chocolate pill "− n +". `label` names the product for the button labels. */
withDefaults(
  defineProps<{
    qty: number
    label: string
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
    /** Stock limit reached — "+" is disabled. */
    maxReached?: boolean
  }>(),
  { size: 'md', block: false, maxReached: false },
)
defineEmits<{ increment: []; decrement: [] }>()

const heights = { sm: 'h-10', md: 'h-11', lg: 'h-[52px]' }
</script>

<template>
  <div
    class="inline-flex items-center justify-between rounded-full border bg-ink text-paper"
    :class="[heights[size], block && 'w-full']"
  >
    <button
      type="button"
      class="grid aspect-square h-full cursor-pointer place-items-center rounded-full text-[22px] font-bold leading-none transition-colors hover:text-mango"
      :aria-label="`Bớt 1 ${label}`"
      @click="$emit('decrement')"
    >
      −
    </button>
    <span class="display min-w-[2ch] text-center text-[19px] tabular-nums" aria-live="polite">{{ qty }}</span>
    <button
      type="button"
      class="grid aspect-square h-full cursor-pointer place-items-center rounded-full text-[22px] font-bold leading-none transition-colors hover:text-mango disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-paper"
      :aria-label="maxReached ? `${label}: đã hết hàng để thêm` : `Thêm 1 ${label}`"
      :disabled="maxReached"
      @click="$emit('increment')"
    >
      +
    </button>
  </div>
</template>
