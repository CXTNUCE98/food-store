<script setup lang="ts">
import type { Product } from '~/domain/types'
/** The featured product powers the sticker card on the right. */
const props = defineProps<{ featured: Product | null }>()

const { site: SITE, toSellable } = useCatalog()
const featuredItem = computed(() => (props.featured ? toSellable('PRODUCT', props.featured) : null))
</script>

<template>
  <section class="overflow-x-clip pb-[clamp(48px,7vw,88px)] pt-[clamp(32px,6vw,72px)]">
    <div
      class="wrap grid items-center gap-x-12 gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]"
    >
      <div>
        <p
          class="animate-rise inline-flex rounded-full border bg-white px-4 py-2 text-[13px] font-semibold shadow-hard-sm"
        >
          Chọn món → đặt trên web hoặc gửi ảnh đơn
        </p>

        <h1 class="display animate-rise mt-7 [animation-delay:80ms] [font-size:clamp(48px,7.5vw,96px)]">
          Ăn vặt<br />
          siêu ngon,
          <span
            class="mt-[0.12em] inline-block -rotate-2 rounded-[0.22em] border bg-lime px-[0.18em] pb-[0.1em] pt-[0.06em] shadow-hard"
          >
            mê là ghiền!
          </span>
        </h1>

        <p class="animate-rise mt-7 max-w-[44ch] text-ink-soft [animation-delay:160ms] [font-size:clamp(16px,1.8vw,19px)]">
          Đồ ăn vặt chua cay mặn ngọt, làm mới mỗi ngày. Bấm thêm món vào giỏ rồi đặt ngay
          trên web, hoặc tạo ảnh đơn gửi tụi mình qua Messenger — chốt đơn trong vài phút.
        </p>

        <!-- Side by side when there's room, full-width stack on phones. -->
        <div
          class="animate-rise mt-8 grid max-w-[460px] gap-3.5 [animation-delay:240ms] [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]"
        >
          <AppButton variant="ink" size="lg" href="#menu">Xem menu</AppButton>
          <AppButton variant="white" size="lg" :href="SITE.messengerUrl" external>
            <IconMessenger />
            Nhắn Messenger
          </AppButton>
        </div>
      </div>

      <div v-if="featured && featuredItem" class="relative mx-auto w-full max-w-[440px] px-3 py-8">
        <!-- Rise lives on a wrapper: the animation owns `transform`, the card owns its tilt. -->
        <div class="animate-rise [animation-delay:200ms]">
          <article class="rotate-2 rounded-hero border-[3px] bg-white p-4 shadow-hard-lg">
            <div class="relative">
              <ProductThumb :product="featured" eager class="aspect-[4/3] rounded-[18px] border" />
              <BestSticker large class="absolute -right-5 -top-6" />
            </div>
            <div class="px-1 pb-1 pt-4">
              <p class="display text-[clamp(26px,3vw,32px)]">{{ featured.name }}</p>
              <PriceTag :item="featuredItem" class="mt-1.5" />
              <CartControl :item="featuredItem" label="+ Thêm vào giỏ" size="lg" block class="mt-4" />
            </div>
          </article>
        </div>

        <span
          aria-hidden="true"
          class="display animate-float absolute -left-1 top-1 z-10 rounded-full border bg-mango px-4 py-2 text-[20px] shadow-hard-sm [--r:-10deg] [transform:rotate(var(--r))]"
        >
          Chua chua
        </span>
        <span
          aria-hidden="true"
          class="display animate-float absolute -right-1 bottom-2 z-10 rounded-full border bg-pink px-4 py-2 text-[20px] shadow-hard-sm [--r:6deg] [animation-delay:-2.5s] [transform:rotate(var(--r))]"
        >
          Giòn rụm
        </span>
      </div>
    </div>
  </section>
</template>
