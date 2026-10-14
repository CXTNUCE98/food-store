<script setup lang="ts">
import { formatVnd } from '~/utils/format'

/** Sidebar cart summary beside the menu: what's in the cart so far and the way to checkout. */
const { lines, count, total, isEmpty } = useCart()
const { openDrawer } = useOverlays()
const shown = computed(() => lines.value.slice(0, 4))
</script>

<template>
  <div class="rounded-card border bg-white p-4 shadow-hard">
    <div class="flex items-center justify-between gap-2">
      <p class="display text-[22px]">Giỏ của bạn</p>
      <span class="rounded-full border-2 bg-mango px-2 text-[13px] font-extrabold tabular-nums">{{ count }} món</span>
    </div>

    <p v-if="isEmpty" class="mt-2 text-sm text-muted">Chưa có món nào. Bấm “+ Thêm” ở món bạn thích nhé!</p>
    <template v-else>
      <ul class="mt-3 space-y-1.5 text-sm">
        <li v-for="line in shown" :key="line.key" class="flex justify-between gap-2">
          <span class="truncate font-bold">{{ line.qty }} × {{ line.item.name }}</span>
          <span class="shrink-0 tabular-nums text-muted">{{ formatVnd(line.subtotal) }}</span>
        </li>
        <li v-if="lines.length > shown.length" class="text-muted">+ {{ lines.length - shown.length }} món khác</li>
      </ul>
      <div class="mt-3 flex items-baseline justify-between border-t-2 border-dashed border-line pt-3">
        <span class="text-sm font-bold text-muted">Tạm tính</span>
        <span class="display text-[24px] tabular-nums">{{ formatVnd(total) }}</span>
      </div>
      <AppButton block class="mt-3" @click="openDrawer">Xem giỏ & đặt hàng</AppButton>
    </template>
  </div>
</template>
