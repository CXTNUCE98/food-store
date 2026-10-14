<script setup lang="ts">
/** The 3-step "how to order" explainer: three tilted cream cards with candy numbers. */
const steps = [
  {
    n: 1,
    title: 'Chọn món',
    text: 'Lướt menu, bấm “+ Thêm” cho món bạn ưng.',
    card: 'bg-mango-soft -rotate-1',
  },
  {
    n: 2,
    title: 'Đặt hàng',
    text: 'Mở giỏ, bấm “Đặt hàng”: điền SĐT để đặt ngay trên web, hoặc tạo ảnh đơn.',
    card: 'bg-peach-soft rotate-1',
  },
  {
    n: 3,
    title: 'Chốt đơn',
    text: 'Tụi mình xác nhận liền. Theo dõi đơn bằng mã đơn ngay trên web.',
    card: 'bg-matcha-soft -rotate-1',
  },
]
</script>

<template>
  <section id="how" class="wrap py-[clamp(40px,6vw,80px)]">
    <SectionTitle v-reveal class="reveal" eyebrow="Cách đặt" title="Đặt món" accent="3 bước" />

    <ol class="mt-10 grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
      <li v-for="(step, i) in steps" :key="step.n" v-reveal="i * 100" class="reveal">
        <div class="relative h-full rounded-card border p-6 pt-5 shadow-hard" :class="step.card">
          <div class="pointer-events-none absolute inset-2 rounded-[20px] border-2 border-dashed border-ink/25" />
          <CandyText :text="step.n" class="text-[68px] leading-none" aria-hidden="true" />
          <h3 class="display mt-2 text-[26px]">
            <span class="sr-only">Bước {{ step.n }}: </span>{{ step.title }}
          </h3>
          <p class="mt-1.5 text-[15px] font-medium text-ink-soft">{{ step.text }}</p>
          <Doodle :kind="i === 1 ? 'heart' : 'star'" class="absolute right-5 top-5 size-7" />
        </div>
      </li>
    </ol>
  </section>
</template>
