<script setup lang="ts">
/** The 3-step "how to order" explainer. Data is local since it never changes. */
const steps = [
  { n: 1, title: 'Chọn món', text: 'Lướt menu, bấm vào món để xem clip và mô tả chi tiết.' },
  { n: 2, title: 'Chụp màn hình', text: 'Bấm “Chụp món này” để hiện thẻ gọn gàng rồi chụp lại.' },
  { n: 3, title: 'Nhắn tin', text: 'Gửi ảnh qua Messenger/Zalo, tụi mình chốt đơn liền.' },
]
</script>

<template>
  <section class="wrap pb-2 pt-[22px]">
    <div class="grid grid-cols-1 gap-4 min-[681px]:grid-cols-3">
      <div
        v-for="step in steps"
        :key="step.n"
        class="rounded-card border border-border bg-surface p-[22px] shadow-soft-sm"
      >
        <div
          class="display grid size-[38px] place-items-center rounded-full bg-accent text-xl text-accent-ink"
        >
          {{ step.n }}
        </div>
        <h4 class="mb-1 mt-3.5 text-base font-bold">{{ step.title }}</h4>
        <p class="text-sm text-muted">{{ step.text }}</p>
      </div>
    </div>
  </section>
</template>
