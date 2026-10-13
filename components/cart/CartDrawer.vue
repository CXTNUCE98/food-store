<script setup lang="ts">
import { formatPriceWithUnit, formatVnd } from '~/utils/format'

/** Right-hand cart drawer: line items with steppers, total, and the order-image CTA. */
const { lines, count, total, isEmpty, increment, decrement } = useCart()
const { drawerOpen, openOrder, closeAll } = useOverlays()

function browseMenu() {
  closeAll()
  document.getElementById('menu')?.scrollIntoView()
}
</script>

<template>
  <BaseOverlay :open="drawerOpen" side="right" label="Giỏ của bạn" @close="closeAll">
    <div class="flex h-full flex-col border-l bg-paper">
      <div class="flex items-center justify-between gap-3 border-b px-5 py-4">
        <h2 class="display text-[32px]">Giỏ của bạn</h2>
        <CloseButton @click="closeAll" />
      </div>

      <div class="flex-1 overflow-y-auto px-5 py-5">
        <div v-if="isEmpty" class="pt-10 text-center">
          <p class="mx-auto max-w-[30ch] text-ink-soft">
            Giỏ đang trống. Lướt menu và bấm “+” để thêm món nhé.
          </p>
          <AppButton variant="ink" class="mt-6" @click="browseMenu">Xem menu</AppButton>
        </div>

        <ul v-else class="flex flex-col gap-4">
          <li
            v-for="line in lines"
            :key="line.product.id"
            class="grid grid-cols-[64px_1fr] gap-3 rounded-[20px] border bg-white p-3 shadow-hard-sm"
          >
            <ProductThumb :product="line.product" :show-label="false" class="size-16 rounded-[14px] border-2" />
            <div class="min-w-0">
              <p class="font-bold leading-snug">{{ line.product.name }}</p>
              <p class="text-[13px] text-muted">{{ formatPriceWithUnit(line.product) }}</p>
              <div class="mt-2.5 flex items-center justify-between gap-2">
                <QtyStepper
                  :qty="line.qty"
                  :label="line.product.name"
                  size="sm"
                  @increment="increment(line.product)"
                  @decrement="decrement(line.product)"
                />
                <span class="display text-[19px] tabular-nums">{{ formatVnd(line.subtotal) }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="border-t bg-white px-5 pb-5 pt-4">
        <div class="flex items-end justify-between gap-3">
          <span class="pb-1 text-sm font-semibold text-muted">Tổng · {{ count }} món</span>
          <span class="display text-[40px] tabular-nums">{{ formatVnd(total) }}</span>
        </div>
        <AppButton size="lg" block class="mt-4" :disabled="isEmpty" @click="openOrder">
          Tạo ảnh đơn
        </AppButton>
        <p class="mt-3 text-center text-[13px] text-muted">
          Không thanh toán online — gửi ảnh để tụi mình chốt đơn.
        </p>
      </div>
    </div>
  </BaseOverlay>
</template>
