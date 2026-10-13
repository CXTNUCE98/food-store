<script setup lang="ts">
import { renderSVG } from 'uqr'
import type { OrderSnapshot } from '~/domain/types'
import { formatVnd } from '~/utils/format'

/**
 * On-screen order receipt. utils/orderImage.ts draws the same layout onto a
 * canvas for the PNG download — keep the two in step when changing either.
 * The QR encodes the order link so the shop opens the order straight from the image.
 */
const props = defineProps<{ order: OrderSnapshot }>()
const { site } = useCatalog()
const qr = computed(() => (props.order.trackingUrl ? renderSVG(props.order.trackingUrl, { ecc: 'M', border: 1, blackColor: '#17120E', whiteColor: '#FFFFFF' }) : ''))
</script>

<template>
  <div class="overflow-hidden rounded-card border-[3px] bg-white shadow-hard-lg">
    <div class="flex items-center justify-between gap-3 border-b-[3px] bg-lime px-5 pb-4 pt-5">
      <div>
        <p class="display text-[40px]">{{ site.brandLead }} {{ site.brandTail }}</p>
        <p class="mt-1.5 text-sm font-semibold text-ink-soft">Đơn #{{ order.code }} · {{ order.date }}</p>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -- SVG generated locally from the order link -->
      <div v-if="qr" class="size-[76px] shrink-0 overflow-hidden rounded-lg border-2 bg-white [&_svg]:size-full" aria-label="Mã QR đơn hàng" v-html="qr" />
    </div>

    <ul class="divide-y-[1.5px] divide-line px-5">
      <li v-for="(line, i) in order.lines" :key="i" class="flex items-start justify-between gap-4 py-3">
        <div class="min-w-0">
          <p class="font-bold leading-snug">{{ line.qty }} × {{ line.name }}</p>
          <p class="text-[13px] text-muted">{{ line.priceLabel }}</p>
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
      Gửi ảnh này qua Messenger để chốt đơn · {{ site.openingHours }}
    </p>
  </div>
</template>
