<script setup lang="ts">
import { formatVnd } from '~/utils/format'

interface FoundOrder {
  code: string
  status: string
  statusLabel: string
  paymentStatusLabel: string
  deliveryMethod: 'DELIVERY' | 'PICKUP'
  total: number
  createdAt: string
  itemCount: number
  itemsSummary: string
}

/** Order lookup without login: the orders placed with a phone number, or the ones placed from this browser. */
await loadCatalog()
useSeoMeta({ title: 'Tra cứu đơn hàng', robots: 'noindex' })

const { savedOrders, lookupPhone } = useOrders()
const phone = ref(lookupPhone.value ?? '')
const recent = ref<{ code: string; token: string; createdAt: string }[]>([])
onMounted(() => (recent.value = savedOrders()))

/**
 * The phone the list was searched with (set on submit, so typing doesn't refetch). Shared with the
 * order page, which uses it as access — so it never lands in the URL — and back here keeps the list.
 */
const searched = lookupPhone
const { data: found, error: lookupError, isFetching: searching, refetch } = useQuery({
  queryKey: queryKeys.ordersByPhone(searched),
  queryFn: (): Promise<FoundOrder[]> => $foodStoreApi('/orders/lookup', { query: { phone: searched.value! } }),
  enabled: computed(() => !!searched.value),
  retry: false,
})
const error = computed(() => (lookupError.value ? toApiError(lookupError.value).message : ''))

function submit() {
  const p = phone.value.replace(/\s/g, '')
  if (!p) return
  if (p === searched.value) void refetch()
  searched.value = p
}

const STATUS_BG: Record<string, string> = { PENDING: 'bg-mango', COMPLETED: 'bg-lime', CANCELLED: 'bg-paper text-muted' }
</script>

<template>
  <section class="wrap max-w-[560px] py-[clamp(40px,7vw,80px)]">
    <p class="eyebrow">Đơn hàng</p>
    <h1 class="display mt-3 text-[clamp(36px,6vw,56px)]">Tra cứu đơn</h1>

    <form class="mt-8 space-y-3 rounded-hero border-[3px] bg-white p-5 shadow-hard" @submit.prevent="submit">
      <CheckoutField
        v-model="phone"
        label="Số điện thoại đặt hàng"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        placeholder="09xx xxx xxx"
        :error="error || undefined"
      />
      <AppButton type="submit" size="lg" block :disabled="searching">{{ searching ? 'Đang tìm…' : 'Xem đơn' }}</AppButton>
    </form>

    <AppLoader v-if="searching && !found" label="Đang tìm đơn…" class="mt-4" />
    <div v-else-if="found" class="mt-8">
      <h2 class="text-sm font-bold uppercase tracking-[0.14em] text-muted">
        <!-- The API returns at most the 20 latest. -->
        {{ !found.length ? 'Kết quả' : found.length >= 20 ? '20 đơn gần nhất của số này' : `${found.length} đơn của số này` }}
      </h2>
      <p v-if="!found.length" class="mt-3 rounded-card border bg-white p-5 text-ink-soft shadow-hard-sm">
        Chưa có đơn nào đặt bằng số này. Kiểm tra lại số điện thoại, hoặc nhắn shop nếu bạn đặt qua Messenger nhé.
      </p>
      <ul v-else class="mt-3 space-y-3">
        <li v-for="o in found" :key="o.code">
          <NuxtLink :to="`/don-hang/${o.code}`" class="press block rounded-card border bg-white p-4 shadow-hard-sm">
            <span class="flex items-center justify-between gap-3">
              <b class="text-lg">#{{ o.code }}</b>
              <span class="shrink-0 rounded-full border-2 px-2.5 py-0.5 text-xs font-bold" :class="STATUS_BG[o.status] ?? 'bg-white'">
                {{ o.statusLabel }}
              </span>
            </span>
            <span class="mt-1 block truncate text-sm text-ink-soft">{{ o.itemsSummary }}</span>
            <span class="mt-2 flex items-end justify-between gap-3">
              <span class="text-sm font-semibold text-muted">
                {{ new Date(o.createdAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) }} · {{ o.paymentStatusLabel }}
              </span>
              <span class="display text-[20px] tabular-nums">{{ formatVnd(o.total) }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div v-if="recent.length" class="mt-8">
      <h2 class="text-sm font-bold uppercase tracking-[0.14em] text-muted">Đơn đặt từ máy này</h2>
      <ul class="mt-3 space-y-2">
        <li v-for="o in recent" :key="o.code">
          <NuxtLink :to="`/don-hang/${o.code}?t=${o.token}`" class="press flex items-center justify-between rounded-full border bg-white px-5 py-3 font-bold shadow-hard-sm">
            <span>#{{ o.code }}</span>
            <span class="text-sm font-semibold text-muted">{{ new Date(o.createdAt).toLocaleDateString('vi-VN') }} →</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
