<script setup lang="ts">
/**
 * VietQR image: the banking app prefills account, amount and the transfer content (order code),
 * which is what the SePay webhook matches to mark the order paid. Drawn by SePay; banks SePay's
 * renderer doesn't know fall back to img.vietqr.io (needs the BIN). Hidden if neither can draw it.
 */
const props = defineProps<{ bankName: string; bankBin?: string; accountNumber: string; amount: number; content: string }>()

const sources = computed(() => {
  const sepay = new URLSearchParams({ acc: props.accountNumber, bank: props.bankBin || props.bankName, amount: String(props.amount), des: props.content, template: 'compact' })
  const list = [{ src: `https://qr.sepay.vn/img?${sepay}`, download: `https://qr.sepay.vn/img?${sepay}&download=true` }]
  if (props.bankBin) {
    const q = new URLSearchParams({ amount: String(props.amount), addInfo: props.content })
    const src = `https://img.vietqr.io/image/${props.bankBin}-${encodeURIComponent(props.accountNumber)}-compact.png?${q}`
    list.push({ src, download: src })
  }
  return list
})
const attempt = ref(0)
const current = computed(() => sources.value[attempt.value])
watch(sources, () => (attempt.value = 0))
</script>

<template>
  <figure v-if="current" class="mx-auto w-full max-w-[320px]">
    <img :src="current.src" :alt="`Mã QR chuyển khoản đơn ${content}`" width="320" height="320" class="aspect-square w-full rounded-xl border bg-white object-contain" @error="attempt++" />
    <figcaption class="mt-2 text-center text-[13px] text-muted">
      Quét bằng app ngân hàng, số tiền và nội dung đã điền sẵn.
      <a :href="current.download" download target="_blank" rel="noopener" class="font-semibold underline underline-offset-2">Tải mã QR</a>
    </figcaption>
  </figure>
</template>
