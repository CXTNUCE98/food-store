<script setup lang="ts">
/**
 * VietQR image hosted by SePay: the banking app prefills account, amount and the order
 * code as content, which is what the SePay webhook matches to mark the order paid.
 * Hidden if SePay can't render it (e.g. a bank name it doesn't recognise).
 */
const props = defineProps<{ bankName: string; accountNumber: string; amount: number; content: string }>()

const failed = ref(false)
const src = computed(() => {
  const q = new URLSearchParams({ acc: props.accountNumber, bank: props.bankName, amount: String(props.amount), des: props.content, template: 'compact' })
  return `https://qr.sepay.vn/img?${q}`
})
watch(src, () => (failed.value = false))
</script>

<template>
  <figure v-if="!failed" class="mx-auto w-full max-w-[240px]">
    <img :src="src" :alt="`Mã QR chuyển khoản đơn ${content}`" width="240" height="240" class="aspect-square w-full rounded-xl border bg-white object-contain" @error="failed = true" />
    <figcaption class="mt-2 text-center text-[12px] text-muted">Quét bằng app ngân hàng, số tiền và nội dung đã điền sẵn</figcaption>
  </figure>
</template>
