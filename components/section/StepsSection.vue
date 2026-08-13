<script setup lang="ts">
import IconList from '~/components/icon/IconList.vue'
import IconCamera from '~/components/icon/IconCamera.vue'
import IconMessenger from '~/components/icon/IconMessenger.vue'

/**
 * The 3-step "how to order" explainer, compressed into a single slim band so
 * the menu sits closer to the first viewport. Icons are imported as component
 * objects so `:is` resolves them at runtime.
 */
const steps = [
  { n: 1, title: 'Chọn món', text: 'Lướt menu, bấm vào món để xem clip và mô tả chi tiết.', icon: IconList },
  { n: 2, title: 'Chụp màn hình', text: 'Bấm “Chụp món này” để hiện thẻ gọn gàng rồi chụp lại.', icon: IconCamera },
  { n: 3, title: 'Nhắn tin', text: 'Gửi ảnh qua Messenger, tụi mình chốt đơn liền.', icon: IconMessenger },
]
</script>

<template>
  <section id="how" class="wrap pb-2 pt-6">
    <div
      v-reveal
      class="reveal grid grid-cols-1 gap-5 rounded-card border border-border bg-surface px-6 py-5 shadow-soft-sm min-[681px]:grid-cols-[1fr_auto_1fr_auto_1fr] min-[681px]:items-center min-[681px]:gap-4"
    >
      <template v-for="step in steps" :key="step.n">
        <div class="flex items-start gap-3.5">
          <div
            class="display grid size-10 flex-none place-items-center rounded-full bg-accent text-base text-accent-ink"
          >
            {{ step.n }}
          </div>
          <div>
            <h4 class="flex items-center gap-1.5 text-[15px] font-bold">
              <component :is="step.icon" class="size-4 shrink-0 text-accent" />
              {{ step.title }}
            </h4>
            <p class="mt-0.5 text-[13px] text-muted">{{ step.text }}</p>
          </div>
        </div>

        <!-- Connector arrow between steps (desktop only). -->
        <span
          v-if="step.n < steps.length"
          aria-hidden="true"
          class="hidden -rotate-90 text-faint min-[681px]:block [&_svg]:size-4"
        >
          <IconArrowDown />
        </span>
      </template>
    </div>
  </section>
</template>
