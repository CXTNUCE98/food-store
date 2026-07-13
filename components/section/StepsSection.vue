<script setup lang="ts">
/** The 3-step "how to order" explainer. Data is local since it never changes. */
const steps = [
  { n: 1, title: 'Chọn món', text: 'Lướt menu, bấm vào món để xem clip và mô tả chi tiết.' },
  { n: 2, title: 'Chụp màn hình', text: 'Bấm “Chụp món này” để hiện thẻ gọn gàng rồi chụp lại.' },
  { n: 3, title: 'Nhắn tin', text: 'Gửi ảnh qua Messenger/Zalo, tụi mình chốt đơn liền.' },
]
</script>

<template>
  <section class="steps wrap">
    <div class="steps-in">
      <div v-for="step in steps" :key="step.n" class="step">
        <div class="n display">{{ step.n }}</div>
        <h4>{{ step.title }}</h4>
        <p>{{ step.text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps {
  padding: 22px 0 8px;
}

.steps-in {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.step {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--shadow-sm);
}

.n {
  font-size: 20px;
  color: var(--accent-ink);
  background: var(--accent);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.step h4 {
  margin: 14px 0 4px;
  font-size: 16px;
  font-weight: 700;
}

.step p {
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 680px) {
  .steps-in {
    grid-template-columns: 1fr;
  }
}
</style>
