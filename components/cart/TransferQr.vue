<script setup lang="ts">
/**
 * VietQR image hosted by SePay: the banking app prefills account, amount and the order
 * code as content, which is what the SePay webhook matches to mark the order paid.
 * Hidden if SePay can't render it (e.g. a bank name it doesn't recognise).
 */
const props = defineProps<{ bankName: string; accountNumber: string; amount: number; content: string }>()

const failed = ref(false)
const query = computed(() => new URLSearchParams({ acc: props.accountNumber, bank: props.bankName, amount: String(props.amount), des: props.content, template: 'compact' }))
const src = computed(() => `https://qr.sepay.vn/img?${query.value}`)
// On a phone the customer saves the image and opens it from their banking app.
const downloadUrl = computed(() => `https://qr.sepay.vn/img?${query.value}&download=true`)
watch(src, () => (failed.value = false))
</script>

<template>
  <figure v-if="!failed" class="mx-auto w-full max-w-[320px]">
    <img :src="src" :alt="`Mã QR chuyển khoản đơn ${content}`" width="320" height="320" class="aspect-square w-full rounded-xl border bg-white object-contain" @error="failed = true" />
    <figcaption class="mt-2 text-center text-[13px] text-muted">
      Quét bằng app ngân hàng, số tiền và nội dung đã điền sẵn.
      <a :href="downloadUrl" download class="font-semibold underline underline-offset-2">Tải mã QR</a>
    </figcaption>
  </figure>
</template>
