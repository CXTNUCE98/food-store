<script setup lang="ts">
import type { Product } from '~/domain/types'
import { SITE_NAME } from '~/site.config'

/**
 * Banner-style hero: candy wordmark on a wooden "SHOP" plank, the dashed
 * "Thiên đường ăn vặt" pill and the red tagline on the left; the featured
 * product as a tilted sticker card on the right; the shop's promises on a
 * gingham tablecloth underneath.
 */
const props = defineProps<{ featured: Product | null }>()

const { site: SITE, toSellable } = useCatalog()
const featuredItem = computed(() => (props.featured ? toSellable('PRODUCT', props.featured) : null))
</script>

<template>
  <section class="hero-glow relative overflow-x-clip">
    <!-- Hand-lettered corner tags, only where there's room beside the content. -->
    <span
      aria-hidden="true"
      class="brush display absolute left-[2%] top-10 hidden -rotate-6 px-8 py-3 text-center text-[22px] uppercase leading-tight 2xl:block"
    >
      Ăn vặt<br />siêu ngon
    </span>
    <span
      aria-hidden="true"
      class="brush display absolute right-[2%] top-10 hidden rotate-3 px-8 py-3 text-center text-[22px] uppercase leading-tight 2xl:block"
    >
      Ăn là mê<br />mê là ghiền <span class="text-orange-deep">♥</span>
    </span>

    <div
      class="wrap relative grid grid-cols-1 items-center gap-x-10 gap-y-10 pb-8 pt-[clamp(28px,5vw,64px)]"
      :class="featured ? 'lg:grid-cols-[1.15fr_0.85fr]' : 'justify-items-center'"
    >
      <div class="relative text-center" :class="featured && 'lg:text-left'">
        <Doodle kind="star" class="animate-twinkle absolute -top-3 right-[6%] size-8 lg:right-[14%]" />
        <Doodle kind="sparkle" class="animate-twinkle absolute left-[4%] top-[46%] size-6 [animation-delay:-1.4s] lg:-left-7" />

        <!-- Rise lives on the heading: the animation owns `transform`, its children own their tilts. -->
        <h1 class="animate-rise flex flex-col items-center" :class="featured && 'lg:items-start'">
          <CandyText :text="SITE_NAME" class="text-[clamp(60px,10.5vw,120px)] leading-[1.05]" />
          <span
            class="wood display relative -mt-1 -rotate-2 rounded-xl border-[3px] px-7 pb-0.5 pt-1.5 text-[clamp(24px,3.2vw,36px)] leading-none tracking-[0.1em] shadow-hard-sm lg:ml-[18%]"
          >
            <span aria-hidden="true" class="text-ink/50">≡ </span>SHOP<span aria-hidden="true" class="text-ink/50"> ≡</span>
          </span>
          <span
            class="display mt-5 inline-flex items-center gap-2.5 rounded-full border-[3px] border-dashed bg-white px-5 py-1.5 text-[clamp(22px,3.1vw,38px)] uppercase shadow-soft sm:px-7"
          >
            <Doodle kind="heart" class="size-[0.7em] shrink-0" />
            Thiên đường ăn vặt
            <Doodle kind="heart" class="size-[0.7em] shrink-0" />
          </span>
        </h1>

        <p class="display animate-rise mt-5 text-[clamp(17px,2vw,22px)] uppercase text-eyebrow [animation-delay:120ms]">
          Ăn vặt siêu ngon – mê là ghiền!
        </p>
        <p
          class="animate-rise mx-auto mt-3 max-w-[46ch] text-ink-soft [animation-delay:180ms] [font-size:clamp(16px,1.7vw,18px)]"
          :class="featured && 'lg:mx-0'"
        >
          Đồ ăn vặt chua cay mặn ngọt, làm mới mỗi ngày. Bấm thêm món vào giỏ rồi đặt ngay
          trên web, hoặc tạo ảnh đơn gửi tụi mình qua Messenger — chốt đơn trong vài phút.
        </p>

        <!-- Side by side when there's room, full-width stack on phones. -->
        <div
          class="animate-rise mx-auto mt-7 grid max-w-[460px] gap-3.5 [animation-delay:240ms] [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]"
          :class="featured && 'lg:mx-0'"
        >
          <AppButton size="lg" href="#menu">Xem menu</AppButton>
          <AppButton variant="white" size="lg" :href="SITE.messengerUrl" external>
            <IconMessenger />
            Nhắn Messenger
          </AppButton>
        </div>
      </div>

      <div v-if="featured && featuredItem" class="relative mx-auto w-full max-w-[420px] px-4 py-8">
        <!-- Rise lives on a wrapper: the animation owns `transform`, the card owns its tilt. -->
        <div class="animate-rise [animation-delay:200ms]">
          <article class="rotate-2 rounded-hero border-[3px] bg-white p-3 shadow-hard-lg">
            <div class="relative">
              <ProductThumb :product="featured" eager class="aspect-[4/3] rounded-[26px] border-2" />
              <BestSticker large class="absolute -right-7 -top-8" />
            </div>
            <div class="px-2 pb-2 pt-4">
              <p class="text-xs font-extrabold uppercase tracking-[0.14em] text-eyebrow">Món hot hôm nay</p>
              <p class="display mt-0.5 text-[clamp(24px,2.6vw,30px)]">{{ featured.name }}</p>
              <PriceTag :item="featuredItem" size="lg" class="mt-1" />
              <CartControl :item="featuredItem" label="+ Thêm vào giỏ" size="lg" block class="mt-4" />
            </div>
          </article>
        </div>

        <Doodle kind="burst" class="absolute -left-3 top-0 size-12 -rotate-12" />
        <span
          aria-hidden="true"
          class="display animate-float absolute -left-2 top-16 z-10 rounded-full border bg-mango px-4 py-1.5 text-[19px] shadow-hard-sm [--r:-10deg] [transform:rotate(var(--r))]"
        >
          Chua chua
        </span>
        <span
          aria-hidden="true"
          class="display animate-float absolute -right-1 bottom-4 z-10 rounded-full border bg-white px-4 py-1.5 text-[19px] text-orange-deep shadow-hard-sm [--r:6deg] [animation-delay:-2.5s] [transform:rotate(var(--r))]"
        >
          Giòn rụm ♥
        </span>
      </div>
    </div>

    <!-- Tablecloth fades in under the promises row. -->
    <div class="relative pb-12 pt-6">
      <div aria-hidden="true" class="gingham absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_45%,#000_75%,transparent)]" />
      <TrustBadges class="wrap relative" />
    </div>
  </section>
</template>
