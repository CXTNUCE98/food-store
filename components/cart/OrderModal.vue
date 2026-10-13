<script setup lang="ts">
import type { DeliveryMethod, OrderSnapshot, PaymentMethod } from '~/domain/types'
import type { CheckoutContact, CreatedOrder } from '~/composables/useOrders'
import { parseCartKey } from '~/composables/useCart'
import { formatVnd } from '~/utils/format'
import { downloadBlob, renderOrderImage } from '~/utils/orderImage'

/**
 * Checkout. Two ways to order:
 *  - "Đặt trên web": name + phone (+ address) → the order lands in the admin right away.
 *  - "Gửi ảnh đơn": the API creates the order first, so the image carries the real
 *    order code and a QR the shop can scan — then the customer sends it on Messenger.
 * Prices are re-checked by the API; if stock or a flash sale changed, the cart is
 * corrected and the customer sees why.
 */
type Step = 'choose' | 'form' | 'web-done' | 'image-done'

const cart = useCart()
const { orderOpen, closeAll, openDrawer } = useOverlays()
const { site, paymentMethods, online } = useCatalog()
const { placeOrder, snapshot, trackingUrl } = useOrders()
const refreshCatalog = useRefreshCatalog()

const step = ref<Step>('choose')
const error = ref('')
const created = ref<CreatedOrder | null>(null)
const receipt = ref<OrderSnapshot | null>(null)

const form = reactive({
  customerName: '',
  customerPhone: '',
  deliveryMethod: 'DELIVERY' as DeliveryMethod,
  address: '',
  note: '',
  paymentMethod: 'COD' as PaymentMethod,
})
const fieldErrors = ref<Record<string, string>>({})

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  COD: 'Tiền mặt khi nhận hàng',
  BANK_TRANSFER: 'Chuyển khoản',
  ONLINE: 'Thanh toán online',
}
// Online payment isn't integrated yet (provider pending) — offer only COD / bank transfer.
const payOptions = computed<PaymentMethod[]>(() => paymentMethods.value.filter((m) => m !== 'ONLINE'))

watch(orderOpen, (open) => {
  if (!open) return
  step.value = 'choose'
  error.value = ''
  fieldErrors.value = {}
  if (!payOptions.value.includes(form.paymentMethod)) form.paymentMethod = payOptions.value[0] ?? 'COD'
})

function validate() {
  const e: Record<string, string> = {}
  if (!form.customerName.trim()) e.customerName = 'Cho tụi mình xin tên nhé'
  const digits = form.customerPhone.replace(/\D/g, '').replace(/^84/, '0')
  if (!/^0\d{9}$/.test(digits)) e.customerPhone = 'Số điện thoại 10 số, VD 0901 234 567'
  if (form.deliveryMethod === 'DELIVERY' && !form.address.trim()) e.address = 'Nhập địa chỉ giao hàng'
  fieldErrors.value = e
  return !Object.keys(e).length
}

/** API said the cart is stale: shrink/remove lines to what's available and refresh prices. */
async function handleCartError(err: unknown) {
  const e = toApiError(err)
  error.value = e.message
  if (e.code === 'CART_INVALID' || e.code === 'OUT_OF_STOCK' || e.code === 'FLASH_SALE_SOLD_OUT') {
    await refreshCatalog()
    for (const l of e.details?.lines ?? []) {
      const key = `${l.type}:${l.ref}`
      if (!parseCartKey(key)) continue
      const qty = l.issues.some((i) => i !== 'FLASH_SALE_LIMITED') ? Math.max(0, l.available) : cart.items.value[key] ?? 0
      cart.setQty({ kind: l.type as 'PRODUCT' | 'COMBO', id: l.ref }, qty)
    }
    error.value = `${e.message}. Giỏ đã được cập nhật theo hàng còn lại.`
  }
}

const { mutateAsync: submitOrder, isPending: busy } = useMutation({
  mutationFn: ({ source, contact }: { source: 'WEB' | 'MESSENGER'; contact?: CheckoutContact }) => placeOrder(source, contact),
  onMutate: () => {
    error.value = ''
  },
  onSuccess: (order) => {
    created.value = order
    receipt.value = snapshot(order)
    cart.clear()
    // Stock and flash slots just went down — refresh the menu in the background.
    void refreshCatalog()
  },
  // Awaited before the mutation settles, so the buttons stay busy while the cart is corrected.
  onError: handleCartError,
})

async function submitWeb() {
  if (!validate()) return
  try {
    await submitOrder({
      source: 'WEB',
      contact: {
        customerName: form.customerName.trim(),
        customerPhone: form.customerPhone,
        deliveryMethod: form.deliveryMethod,
        address: form.deliveryMethod === 'DELIVERY' ? form.address.trim() : undefined,
        note: form.note.trim() || undefined,
        paymentMethod: form.paymentMethod,
      },
    })
    step.value = 'web-done'
  } catch {
    // Shown by handleCartError.
  }
}

async function createImageOrder() {
  try {
    await submitOrder({ source: 'MESSENGER' })
    step.value = 'image-done'
  } catch {
    // Shown by handleCartError.
  }
}

const downloading = ref(false)
async function download() {
  if (!receipt.value) return
  downloading.value = true
  try {
    const blob = await renderOrderImage(receipt.value, site.value)
    downloadBlob(blob, `top-tep-don-${receipt.value.code}.png`)
  } catch {
    error.value = 'Chưa tạo được ảnh. Bạn chụp màn hình hoá đơn này gửi tụi mình cũng được nhé.'
  } finally {
    downloading.value = false
  }
}

function backToCart() {
  openDrawer()
}

const trackLink = computed(() => (created.value ? trackingUrl(created.value).replace(/^https?:\/\/[^/]+/, '') : '/don-hang'))
</script>

<template>
  <BaseOverlay :open="orderOpen" label="Đặt hàng" @close="closeAll">
    <div class="rounded-hero border-[3px] bg-paper p-5">
      <div class="flex items-center justify-between gap-3">
        <h2 class="display text-[28px]">
          {{ step === 'web-done' ? 'Đặt hàng thành công!' : step === 'image-done' ? 'Ảnh đơn của bạn' : 'Đặt hàng' }}
        </h2>
        <CloseButton @click="closeAll" />
      </div>

      <!-- Step 1: choose how to order -->
      <div v-if="step === 'choose'" class="mt-5 space-y-3">
        <div class="flex items-baseline justify-between rounded-2xl border bg-white px-4 py-3">
          <span class="text-sm font-semibold text-muted">{{ cart.count.value }} món</span>
          <span class="display text-[28px] tabular-nums">{{ formatVnd(cart.total.value) }}</span>
        </div>

        <button
          type="button"
          class="press block w-full rounded-[22px] border bg-lime p-4 text-left shadow-hard-sm disabled:opacity-50"
          :disabled="!online || cart.isEmpty.value"
          @click="step = 'form'"
        >
          <span class="display block text-[22px]">Đặt ngay trên web →</span>
          <span class="mt-1 block text-sm text-ink-soft">Điền tên, SĐT, địa chỉ. Tụi mình gọi/nhắn xác nhận trong vài phút.</span>
        </button>

        <button
          type="button"
          class="press block w-full rounded-[22px] border bg-white p-4 text-left shadow-hard-sm disabled:opacity-50"
          :disabled="busy || !online || cart.isEmpty.value"
          @click="createImageOrder"
        >
          <span class="display flex items-center gap-2 text-[22px]"><IconMessenger class="size-6" /> {{ busy ? 'Đang tạo ảnh…' : 'Gửi ảnh đơn qua Messenger →' }}</span>
          <span class="mt-1 block text-sm text-ink-soft">Không cần điền gì — tải ảnh đơn có mã đơn rồi nhắn tụi mình.</span>
        </button>

        <p v-if="!online" class="text-sm font-semibold text-eyebrow">
          Không kết nối được hệ thống đặt hàng. Bạn nhắn tụi mình qua
          <a :href="site.messengerUrl" target="_blank" rel="noopener" class="underline">Messenger</a> nhé.
        </p>
        <button type="button" class="w-full py-1 text-center text-sm font-semibold text-muted underline-offset-4 hover:underline" @click="backToCart">
          ← Quay lại giỏ
        </button>
      </div>

      <!-- Step 2: web checkout form -->
      <form v-else-if="step === 'form'" class="mt-5 space-y-3" novalidate @submit.prevent="submitWeb">
        <CheckoutField v-model="form.customerName" label="Tên của bạn" autocomplete="name" :error="fieldErrors.customerName" />
        <CheckoutField v-model="form.customerPhone" label="Số điện thoại" type="tel" autocomplete="tel" inputmode="tel" :error="fieldErrors.customerPhone" />

        <fieldset>
          <legend class="mb-1.5 text-sm font-bold">Nhận hàng</legend>
          <div class="grid grid-cols-2 gap-2">
            <label
              v-for="opt in [{ v: 'DELIVERY', l: 'Giao tận nơi' }, { v: 'PICKUP', l: 'Lấy tại quán' }]"
              :key="opt.v"
              class="flex min-h-11 cursor-pointer items-center justify-center rounded-full border px-3 text-sm font-bold"
              :class="form.deliveryMethod === opt.v ? 'bg-ink text-paper' : 'bg-white'"
            >
              <input v-model="form.deliveryMethod" type="radio" :value="opt.v" class="sr-only" />
              {{ opt.l }}
            </label>
          </div>
        </fieldset>
        <CheckoutField v-if="form.deliveryMethod === 'DELIVERY'" v-model="form.address" label="Địa chỉ giao hàng" autocomplete="street-address" multiline :error="fieldErrors.address" />

        <fieldset v-if="payOptions.length > 1">
          <legend class="mb-1.5 text-sm font-bold">Thanh toán</legend>
          <div class="grid gap-2" :class="payOptions.length > 1 && 'grid-cols-2'">
            <label
              v-for="m in payOptions"
              :key="m"
              class="flex min-h-11 cursor-pointer items-center justify-center rounded-full border px-3 text-center text-sm font-bold"
              :class="form.paymentMethod === m ? 'bg-ink text-paper' : 'bg-white'"
            >
              <input v-model="form.paymentMethod" type="radio" :value="m" class="sr-only" />
              {{ PAYMENT_LABELS[m] }}
            </label>
          </div>
        </fieldset>
        <CheckoutField v-model="form.note" label="Ghi chú (không bắt buộc)" placeholder="Ít cay, giao sau 5h…" />

        <div class="flex items-baseline justify-between pt-1">
          <span class="text-sm font-semibold text-muted">Tạm tính · {{ cart.count.value }} món</span>
          <span class="display text-[30px] tabular-nums">{{ formatVnd(cart.total.value) }}</span>
        </div>
        <p class="text-[13px] text-muted">{{ site.shippingNote }}</p>
        <div class="flex gap-3">
          <AppButton variant="white" size="lg" @click="step = 'choose'">←</AppButton>
          <AppButton type="submit" size="lg" block :disabled="busy">{{ busy ? 'Đang gửi đơn…' : 'Xác nhận đặt hàng' }}</AppButton>
        </div>
      </form>

      <!-- Done: web order -->
      <div v-else-if="step === 'web-done' && created && receipt" class="mt-5 space-y-4">
        <div class="rounded-2xl border bg-lime p-4">
          <p class="text-sm font-semibold">Mã đơn của bạn</p>
          <p class="display mt-1 text-[36px]">#{{ created.code }}</p>
          <p class="mt-1 text-sm text-ink-soft">Tụi mình sẽ gọi hoặc nhắn {{ form.customerPhone }} để xác nhận nhé.</p>
        </div>
        <div v-if="created.paymentMethod === 'BANK_TRANSFER' && site.bankTransfer?.accountNumber" class="rounded-2xl border bg-white p-4 text-sm">
          <p class="font-bold">Chuyển khoản {{ formatVnd(created.total) }}</p>
          <p class="mt-1">{{ site.bankTransfer.bankName }} · <b class="tabular-nums">{{ site.bankTransfer.accountNumber }}</b></p>
          <p>Chủ TK: {{ site.bankTransfer.accountName }}</p>
          <p>Nội dung: <b>{{ created.code }}</b></p>
        </div>
        <OrderReceipt :order="receipt" class="-rotate-1" />
        <div class="flex flex-wrap gap-3 [&>*]:flex-1">
          <AppButton variant="ink" size="lg" :href="trackLink">Theo dõi đơn</AppButton>
          <AppButton variant="white" size="lg" :disabled="downloading" @click="download"><IconDownload /> Lưu ảnh đơn</AppButton>
        </div>
      </div>

      <!-- Done: image order -->
      <div v-else-if="step === 'image-done' && receipt" class="mt-5">
        <OrderReceipt :order="receipt" class="-rotate-1" />
        <div class="mt-7 flex flex-wrap gap-3 [&>*]:flex-1">
          <AppButton size="lg" :disabled="downloading" @click="download">
            <IconDownload />
            {{ downloading ? 'Đang tạo ảnh…' : 'Tải ảnh PNG' }}
          </AppButton>
          <AppButton variant="white" size="lg" :href="site.messengerUrl" external>
            <IconMessenger />
            Mở Messenger
          </AppButton>
        </div>
        <p class="mt-3 text-center text-[13px] text-muted">
          Gửi ảnh cho tụi mình để chốt đơn. <NuxtLink :to="trackLink" class="font-semibold underline">Theo dõi đơn #{{ receipt.code }}</NuxtLink>
        </p>
      </div>

      <p v-if="error" role="alert" class="mt-3 text-sm font-semibold text-eyebrow">{{ error }}</p>
    </div>
  </BaseOverlay>
</template>
