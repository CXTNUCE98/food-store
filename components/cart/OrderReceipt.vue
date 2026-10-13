<script setup lang="ts">
import type { OrderSnapshot } from '~/domain/types'
import { SITE } from '~/domain/constants'
import { formatPriceWithUnit, formatVnd } from '~/utils/format'

/**
 * On-screen order receipt. utils/orderImage.ts draws the same layout onto a
 * canvas for the PNG download — keep the two in step when changing either.
 */
defineProps<{ order: OrderSnapshot }>()
</script>

<template>
  <div class="overflow-hidden rounded-card border-[3px] bg-white shadow-hard-lg">
    <div class="border-b-[3px] bg-lime px-5 pb-4 pt-5">
      <p class="display text-[40px]">{{ SITE.brandLead }} {{ SITE.brandTail }}</p>
      <p class="mt-1.5 text-sm font-semibold text-ink-soft">Đơn #{{ order.code }} · {{ order.date }}</p>
    </div>

    <ul class="divide-y-[1.5px] divide-line px-5">
      <li v-for="line in order.lines" :key="line.product.id" class="flex items-start justify-between gap-4 py-3">
        <div class="min-w-0">
          <p class="font-bold leading-snug">{{ line.qty }} × {{ line.product.name }}</p>
          <p class="text-[13px] text-muted">{{ formatPriceWithUnit(line.product) }}</p>
        </div>
        <span class="display shrink-0 text-[19px] tabular-nums">{{ formatVnd(line.subtotal) }}</span>
      </li>
    </ul>

    <div class="mx-5 border-t-[3px] border-dashed" />

    <div class="flex items-end justify-between gap-4 px-5 pt-4">
      <div>
        <p class="font-bold">Tổng cộng</p>
        <p class="text-[13px] text-muted">{{ order.count }} món</p>
      </div>
      <p class="display text-[40px] tabular-nums">{{ formatVnd(order.total) }}</p>
    </div>

    <p class="px-5 pb-5 pt-4 text-[13px] text-muted">
      Gửi ảnh này qua Messenger để chốt đơn · {{ SITE.openingHours }}
    </p>
  </div>
</template>
