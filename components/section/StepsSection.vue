<script setup lang="ts">
/** The 3-step "how to order" explainer: three tilted sticker cards. */
const steps = [
  {
    n: 1,
    title: 'Chọn món',
    text: 'Lướt menu, bấm “+ Thêm” cho món bạn ưng.',
    card: 'bg-mango -rotate-1',
  },
  {
    n: 2,
    title: 'Tạo ảnh đơn',
    text: 'Mở giỏ, bấm “Tạo ảnh đơn” để có một ảnh gom đủ món và tổng tiền.',
    card: 'bg-lime rotate-1',
  },
  {
    n: 3,
    title: 'Nhắn tin',
    text: 'Gửi ảnh qua Messenger, tụi mình chốt đơn liền.',
    card: 'bg-pink -rotate-1',
  },
]
</script>

<template>
  <section id="how" class="wrap py-[clamp(48px,7vw,88px)]">
    <div v-reveal class="reveal">
      <p class="eyebrow">Cách đặt</p>
      <h2 class="display mt-3 text-[clamp(36px,5vw,56px)]">Đặt món 3 bước</h2>
    </div>

    <ol class="mt-10 grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
      <li v-for="(step, i) in steps" :key="step.n" v-reveal="i * 100" class="reveal">
        <div class="h-full rounded-card border p-6 shadow-hard" :class="step.card">
          <span class="display block text-[64px]" aria-hidden="true">{{ step.n }}</span>
          <h3 class="display mt-4 text-[26px]">
            <span class="sr-only">Bước {{ step.n }}: </span>{{ step.title }}
          </h3>
          <p class="mt-2 text-[15px] text-ink-soft">{{ step.text }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
