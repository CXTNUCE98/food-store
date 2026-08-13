<script setup lang="ts">
import IconList from '~/components/icon/IconList.vue'
import IconCamera from '~/components/icon/IconCamera.vue'
import IconMessenger from '~/components/icon/IconMessenger.vue'

/**
 * The 3-step "how to order" explainer. Data is local since it never changes.
 * Icons are imported as component objects so `:is` resolves them at runtime
 * (string names are not globally registered by Nuxt auto-imports).
 */
const steps = [
  { n: 1, title: 'Chọn món', text: 'Lướt menu, bấm vào món để xem clip và mô tả chi tiết.', icon: IconList },
  { n: 2, title: 'Chụp màn hình', text: 'Bấm “Chụp món này” để hiện thẻ gọn gàng rồi chụp lại.', icon: IconCamera },
  { n: 3, title: 'Nhắn tin', text: 'Gửi ảnh qua Messenger, tụi mình chốt đơn liền.', icon: IconMessenger },
]
</script>

<template>
  <section class="wrap pb-2 pt-[22px]">
    <div class="grid grid-cols-1 gap-4 min-[681px]:grid-cols-3">
      <div v-for="step in steps" :key="step.n" v-reveal="(step.n - 1) * 110" class="reveal relative h-full">
        <div
          class="h-full rounded-card border border-border bg-surface p-[22px] shadow-soft-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft"
        >
          <div
            class="display grid size-12 place-items-center rounded-full bg-accent text-xl text-accent-ink shadow-soft-sm"
          >
            {{ step.n }}
          </div>
          <h4 class="mb-1 mt-4 flex items-center gap-2 text-base font-bold">
            <component :is="step.icon" class="size-[18px] shrink-0 text-accent" />
            {{ step.title }}
          </h4>
          <p class="text-sm text-muted">{{ step.text }}</p>
        </div>

        <!-- Connector arrow between steps (desktop only). -->
        <span
          v-if="step.n < steps.length"
          aria-hidden="true"
          class="absolute -right-[17px] top-1/2 z-[1] hidden -translate-y-1/2 -rotate-90 text-faint min-[681px]:block [&_svg]:size-4"
        >
          <IconArrowDown />
        </span>
      </div>
    </div>
  </section>
</template>
