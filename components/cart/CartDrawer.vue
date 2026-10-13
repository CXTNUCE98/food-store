<script setup lang="ts">
import { formatVnd } from '~/utils/format'

/** Right-hand cart drawer: line items with steppers, total, and the checkout CTA. */
const { lines, count, total, savings, isEmpty, increment, decrement } = useCart()
const { drawerOpen, openOrder, closeAll } = useOverlays()
const { site } = useCatalog()

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
            :key="line.key"
            class="grid grid-cols-[64px_1fr] gap-3 rounded-[20px] border bg-white p-3 shadow-hard-sm"
          >
            <ProductThumb :product="line.item" :show-label="false" :width="64" class="size-16 rounded-[14px] border-2" />
            <div class="min-w-0">
              <p class="font-bold leading-snug">
                {{ line.item.name }}
                <span v-if="line.item.kind === 'COMBO'" class="ml-1 rounded-full border-2 bg-lime px-1.5 text-[11px]">Combo</span>
              </p>
              <p class="text-[13px] text-muted">
                <template v-if="line.saleQty">
                  <b class="text-eyebrow">⚡ {{ formatVnd(line.item.flashSale!.salePrice) }}</b>
                  <template v-if="line.saleQty < line.qty"> × {{ line.saleQty }}, còn lại {{ formatVnd(line.item.price) }}</template>
                  <s v-else class="ml-1">{{ formatVnd(line.item.price) }}</s>
                </template>
                <template v-else>{{ formatVnd(line.item.price) }} / {{ line.item.unit }}</template>
              </p>
              <div class="mt-2.5 flex items-center justify-between gap-2">
                <QtyStepper
                  :qty="line.qty"
                  :label="line.item.name"
                  :max-reached="line.qty >= line.item.available"
                  size="sm"
                  @increment="increment(line.item)"
                  @decrement="decrement(line.item)"
                />
                <span class="display text-[19px] tabular-nums">{{ formatVnd(line.subtotal) }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="border-t bg-white px-5 pb-5 pt-4">
        <p v-if="savings > 0" class="mb-1 text-right text-sm font-semibold text-eyebrow">Flash sale giảm {{ formatVnd(savings) }}</p>
        <div class="flex items-end justify-between gap-3">
          <span class="pb-1 text-sm font-semibold text-muted">Tổng · {{ count }} món</span>
          <span class="display text-[40px] tabular-nums">{{ formatVnd(total) }}</span>
        </div>
        <AppButton size="lg" block class="mt-4" :disabled="isEmpty" @click="openOrder">
          Đặt hàng
        </AppButton>
        <p class="mt-3 text-center text-[13px] text-muted">
          {{ site.shippingNote ?? 'Phí ship khách thanh toán trực tiếp cho shipper.' }}
        </p>
      </div>
    </div>
  </BaseOverlay>
</template>
