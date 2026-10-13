<script setup lang="ts">
/** Order lookup: enter the order code + phone, or pick one placed from this browser. */
await loadCatalog()
useSeoMeta({ title: 'Tra cứu đơn hàng', robots: 'noindex' })

const { savedOrders } = useOrders()
const code = ref('')
const phone = ref('')
const recent = ref<{ code: string; token: string; createdAt: string }[]>([])
onMounted(() => (recent.value = savedOrders()))

function submit() {
  const c = code.value.trim().replace(/^#/, '').toUpperCase()
  if (!c) return
  void navigateTo({ path: `/don-hang/${c}`, query: phone.value ? { phone: phone.value.replace(/\s/g, '') } : {} })
}
</script>

<template>
  <section class="wrap max-w-[560px] py-[clamp(40px,7vw,80px)]">
    <p class="eyebrow">Đơn hàng</p>
    <h1 class="display mt-3 text-[clamp(36px,6vw,56px)]">Tra cứu đơn</h1>

    <form class="mt-8 space-y-3 rounded-hero border-[3px] bg-white p-5 shadow-hard" @submit.prevent="submit">
      <CheckoutField v-model="code" label="Mã đơn" placeholder="TT482193" />
      <CheckoutField v-model="phone" label="Số điện thoại đặt hàng" type="tel" inputmode="tel" />
      <AppButton type="submit" size="lg" block>Xem đơn</AppButton>
    </form>

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
