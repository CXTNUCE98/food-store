<script setup lang="ts">
import { formatVnd } from '~/utils/format'

interface Tracked {
  code: string
  status: string
  statusLabel: string
  paymentStatus: string
  paymentStatusLabel: string
  paymentMethod: string
  deliveryMethod: 'DELIVERY' | 'PICKUP'
  customerName: string | null
  total: number
  subtotal: number
  discountTotal: number
  createdAt: string
  cancelReason: string | null
  canCancel: boolean
  items: { name: string; qty: number; unitPrice: number; finalUnitPrice: number; lineTotal: number; itemType: string }[]
  timeline: { status: string; label: string; at: string }[]
  bankTransfer: { bankName: string; accountNumber: string; accountName: string; content: string } | null
}

/**
 * Order tracking. Access needs the tracking token (kept in this browser after
 * ordering, or in the link) or the phone number used for the order.
 */
await loadCatalog()
const route = useRoute()
const { apiBase } = useRuntimeConfig().public
const { savedToken } = useOrders()
const { site } = useCatalog()
const code = computed(() => String(route.params.code).toUpperCase())
useSeoMeta({ title: () => `Đơn #${code.value}`, robots: 'noindex' })

const phone = ref((route.query.phone as string) ?? '')
const order = ref<Tracked | null>(null)
const error = ref('')
const loading = ref(true)

function auth() {
  const token = (route.query.t as string) || savedToken(code.value)
  return token ? { token } : phone.value ? { phone: phone.value } : null
}

async function load() {
  const a = auth()
  if (!a) {
    loading.value = false
    return
  }
  try {
    order.value = await $fetch<Tracked>(`/orders/track/${code.value}`, { baseURL: apiBase, query: a })
    error.value = ''
  } catch (err) {
    error.value = toApiError(err).message
  } finally {
    loading.value = false
  }
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  void load()
  // Status changes as the shop works on the order.
  timer = setInterval(() => order.value && !['COMPLETED', 'CANCELLED'].includes(order.value.status) && load(), 30_000)
})
onBeforeUnmount(() => clearInterval(timer))

const FLOW = ['PENDING', 'CONFIRMED', 'PREPARING', 'DELIVERING', 'COMPLETED']
const LABELS: Record<string, string> = { PENDING: 'Chờ xác nhận', CONFIRMED: 'Đã xác nhận', PREPARING: 'Đang chuẩn bị', DELIVERING: 'Đang giao', COMPLETED: 'Hoàn thành' }
const steps = computed(() => (order.value?.deliveryMethod === 'PICKUP' ? FLOW.filter((s) => s !== 'DELIVERING') : FLOW))
const stepIndex = computed(() => steps.value.indexOf(order.value?.status ?? ''))

const cancelling = ref(false)
async function cancel() {
  if (!confirm('Huỷ đơn này?')) return
  cancelling.value = true
  try {
    order.value = await $fetch<Tracked>(`/orders/${code.value}/cancel`, { baseURL: apiBase, method: 'POST', body: { ...auth(), reason: 'Huỷ trên web' } })
  } catch (err) {
    error.value = toApiError(err).message
  } finally {
    cancelling.value = false
  }
}
</script>

<template>
  <section class="wrap max-w-[640px] py-[clamp(40px,7vw,80px)]">
    <NuxtLink to="/don-hang" class="text-sm font-bold text-muted hover:underline">← Tra cứu đơn khác</NuxtLink>
    <h1 class="display mt-3 text-[clamp(36px,6vw,56px)]">Đơn #{{ code }}</h1>

    <p v-if="loading" class="mt-8 text-muted">Đang tải đơn…</p>

    <form v-else-if="!order" class="mt-8 space-y-3 rounded-hero border-[3px] bg-white p-5 shadow-hard" @submit.prevent="loading = true; load()">
      <p class="text-ink-soft">Nhập số điện thoại đã dùng khi đặt để xem đơn.</p>
      <CheckoutField v-model="phone" label="Số điện thoại" type="tel" inputmode="tel" :error="error || undefined" />
      <AppButton type="submit" size="lg" block>Xem đơn</AppButton>
    </form>

    <div v-else class="mt-8 space-y-5">
      <div class="rounded-hero border-[3px] p-5 shadow-hard" :class="order.status === 'CANCELLED' ? 'bg-white' : 'bg-lime'">
        <p class="text-sm font-semibold">Trạng thái</p>
        <p class="display mt-1 text-[34px]">{{ order.statusLabel }}</p>
        <p class="mt-1 text-sm text-ink-soft">
          Đặt lúc {{ new Date(order.createdAt).toLocaleString('vi-VN') }} · {{ order.deliveryMethod === 'PICKUP' ? 'Lấy tại quán' : 'Giao tận nơi' }}
        </p>
        <p v-if="order.cancelReason" class="mt-2 text-sm font-semibold">Lý do: {{ order.cancelReason }}</p>

        <ol v-if="order.status !== 'CANCELLED'" class="mt-5 grid gap-2" :style="{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }">
          <li v-for="(s, i) in steps" :key="s" class="text-center">
            <span class="mx-auto block h-2 rounded-full border-2" :class="i <= stepIndex ? 'bg-ink' : 'bg-white'" />
            <span class="mt-1.5 block text-[11px] font-bold leading-tight" :class="i <= stepIndex ? '' : 'text-ink/50'">{{ LABELS[s] }}</span>
          </li>
        </ol>
      </div>

      <div class="rounded-card border bg-white p-5 shadow-hard-sm">
        <ul class="divide-y-[1.5px] divide-line">
          <li v-for="(item, i) in order.items" :key="i" class="flex justify-between gap-4 py-2.5">
            <span>
              <b>{{ item.qty }} × {{ item.name }}</b>
              <span class="block text-[13px] text-muted">
                {{ formatVnd(item.finalUnitPrice) }}<template v-if="item.finalUnitPrice < item.unitPrice"> ⚡ <s>{{ formatVnd(item.unitPrice) }}</s></template>
              </span>
            </span>
            <span class="display text-[19px] tabular-nums">{{ formatVnd(item.lineTotal) }}</span>
          </li>
        </ul>
        <div class="mt-3 flex items-end justify-between border-t-[3px] border-dashed pt-3">
          <span class="font-bold">Tổng cộng</span>
          <span class="display text-[34px] tabular-nums">{{ formatVnd(order.total) }}</span>
        </div>
        <p class="mt-1 text-sm text-muted">{{ order.paymentStatusLabel }} · {{ site.shippingNote }}</p>
      </div>

      <div v-if="order.bankTransfer?.accountNumber" class="rounded-card border bg-mango p-5 text-sm shadow-hard-sm">
        <p class="display text-[22px]">Chuyển khoản</p>
        <p class="mt-2">{{ order.bankTransfer.bankName }} · <b class="tabular-nums">{{ order.bankTransfer.accountNumber }}</b></p>
        <p>Chủ tài khoản: {{ order.bankTransfer.accountName }}</p>
        <p>Số tiền: <b>{{ formatVnd(order.total) }}</b> · Nội dung: <b>{{ order.bankTransfer.content }}</b></p>
      </div>

      <div class="flex flex-wrap gap-3 [&>*]:flex-1">
        <AppButton variant="white" size="lg" :href="site.messengerUrl" external><IconMessenger /> Nhắn shop</AppButton>
        <AppButton v-if="order.canCancel" variant="chili" size="lg" :disabled="cancelling" @click="cancel">Huỷ đơn</AppButton>
      </div>
      <p v-if="error" role="alert" class="text-sm font-semibold text-eyebrow">{{ error }}</p>
    </div>
  </section>
</template>
