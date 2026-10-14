<script setup lang="ts">
import { formatVnd } from '~/utils/format'

/** Floating cart summary pinned to the bottom; only shown once the cart has items. */
const { count, total, isEmpty } = useCart()
const { openDrawer } = useOverlays()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    leave-active-class="transition duration-200 ease-in"
    enter-from-class="translate-y-[160%] opacity-0"
    leave-to-class="translate-y-[160%] opacity-0"
  >
    <div
      v-if="!isEmpty"
      class="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2"
    >
      <div
        class="flex items-center justify-between gap-3 rounded-full border bg-ink py-1.5 pl-5 pr-1.5 text-paper shadow-hard-orange"
      >
        <p class="flex min-w-0 items-baseline gap-2 truncate font-semibold">
          <span class="tabular-nums">{{ count }} món</span>
          <span class="text-paper/40">·</span>
          <span class="display text-[22px] tabular-nums">{{ formatVnd(total) }}</span>
        </p>
        <button
          type="button"
          class="candy-fill press min-h-11 shrink-0 rounded-full border border-paper px-5 font-extrabold"
          @click="openDrawer"
        >
          Xem giỏ →
        </button>
      </div>
    </div>
  </Transition>
</template>
