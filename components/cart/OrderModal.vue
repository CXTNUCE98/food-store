<script setup lang="ts">
import type { OrderSnapshot } from '~/domain/types'
import { SITE } from '~/domain/constants'
import { formatOrderDate } from '~/utils/format'
import { downloadBlob, renderOrderImage } from '~/utils/orderImage'

/**
 * Order-image modal: shows the receipt, downloads it as a PNG and links to
 * Messenger. A fresh order code and date are stamped each time it opens.
 */
const { lines, count, total } = useCart()
const { orderOpen, closeAll } = useOverlays()

const code = ref('')
const date = ref('')
const busy = ref(false)
const error = ref('')

watch(orderOpen, (open) => {
  if (!open) return
  code.value = String(Math.floor(1000 + Math.random() * 9000))
  date.value = formatOrderDate(new Date())
  error.value = ''
})

const order = computed<OrderSnapshot>(() => ({
  code: code.value,
  date: date.value,
  lines: lines.value,
  count: count.value,
  total: total.value,
}))

async function download() {
  busy.value = true
  error.value = ''
  try {
    const blob = await renderOrderImage(order.value)
    downloadBlob(blob, `top-tep-don-${order.value.code}.png`)
  } catch {
    error.value = 'Chưa tạo được ảnh. Bạn chụp màn hình hóa đơn này gửi tụi mình cũng được nhé.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <BaseOverlay :open="orderOpen" label="Ảnh đơn của bạn" @close="closeAll">
    <div class="rounded-hero border-[3px] bg-paper p-5">
      <div class="flex items-center justify-between gap-3">
        <h2 class="display text-[28px]">Ảnh đơn của bạn</h2>
        <CloseButton @click="closeAll" />
      </div>

      <OrderReceipt :order="order" class="mt-5 -rotate-1" />

      <div class="mt-7 flex flex-wrap gap-3 [&>*]:flex-1">
        <AppButton size="lg" :disabled="busy" @click="download">
          <IconDownload />
          {{ busy ? 'Đang tạo ảnh…' : 'Tải ảnh PNG' }}
        </AppButton>
        <AppButton variant="white" size="lg" :href="SITE.messengerUrl" external>
          <IconMessenger />
          Mở Messenger
        </AppButton>
      </div>
      <p v-if="error" role="alert" class="mt-3 text-sm font-semibold text-eyebrow">{{ error }}</p>
    </div>
  </BaseOverlay>
</template>
