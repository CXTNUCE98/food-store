<script setup lang="ts">
import { SITE_NAME } from '~/site.config'

/**
 * Banner-style hero, laid out like the shop's banner: the candy wordmark,
 * wooden "SHOP" plank and "Thiên đường ăn vặt" pill centered, with dishes on
 * round plates set out on both sides (a row under the title on smaller
 * screens), and the shop's promises on a gingham tablecloth along the bottom.
 */
const { site: SITE, products } = useCatalog()

/** Best-sellers first, then dishes that have a real photo. */
const plates = computed(() =>
  [...products.value]
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(!!b.thumbnail_url) - Number(!!a.thumbnail_url))
    .slice(0, 4),
)

/** Where each plate sits around the title on wide screens, and its tilt. */
const SPOTS = [
  { at: 'left-0 top-2 w-[220px]', tilt: '-rotate-3' },
  { at: 'right-0 top-2 w-[220px]', tilt: 'rotate-3' },
  { at: 'left-[64px] top-[318px] w-[170px]', tilt: 'rotate-2' },
  { at: 'right-[64px] top-[318px] w-[170px]', tilt: '-rotate-2' },
]
</script>

<template>
  <section class="hero-glow relative overflow-x-clip">
    <div class="wrap relative pb-6 pt-[clamp(28px,5vw,52px)]">
      <!-- Wide screens: dishes around the title, like the banner. -->
      <div
        v-for="(product, i) in plates"
        :key="product.id"
        class="animate-rise absolute hidden xl:block"
        :class="SPOTS[i]!.at"
        :style="{ animationDelay: `${150 + i * 90}ms` }"
      >
        <!-- Rise owns the wrapper's transform; the tilt sits one level in. -->
        <HeroPlate :product="product" :eager="i < 2" :class="SPOTS[i]!.tilt" />
      </div>
      <Doodle kind="burst" class="absolute left-[250px] top-6 hidden size-12 -rotate-12 xl:block" />
      <Doodle kind="heart" class="animate-twinkle absolute right-[270px] top-[250px] hidden size-8 xl:block" />

      <div class="relative mx-auto flex max-w-[640px] flex-col items-center text-center">
        <Doodle kind="star" class="animate-twinkle absolute -top-2 right-[4%] size-8" />
        <Doodle kind="sparkle" class="animate-twinkle absolute left-[2%] top-[44%] size-6 [animation-delay:-1.4s]" />

        <span class="brush display -rotate-2 px-6 py-1.5 text-[15px] uppercase tracking-[0.06em] text-ink-soft">
          Ăn vặt siêu ngon · Ăn là mê
        </span>

        <!-- Rise lives on the heading: the animation owns `transform`, its children own their tilts. -->
        <h1 class="animate-rise mt-3 flex flex-col items-center [animation-delay:60ms]">
          <CandyText :text="SITE_NAME" class="text-[clamp(60px,10vw,124px)] leading-[1.05]" />
          <span
            class="wood display -mt-1 -rotate-2 rounded-xl border-[3px] px-7 pb-0.5 pt-1.5 text-[clamp(24px,3vw,34px)] leading-none tracking-[0.1em] shadow-hard-sm"
          >
            <span aria-hidden="true" class="text-ink/50">≡ </span>SHOP<span aria-hidden="true" class="text-ink/50"> ≡</span>
          </span>
          <span
            class="display mt-5 inline-flex items-center gap-2.5 rounded-full border-[3px] border-dashed bg-white px-5 py-1.5 text-[clamp(22px,3vw,36px)] uppercase shadow-soft sm:px-7"
          >
            <Doodle kind="heart" class="size-[0.7em] shrink-0" />
            Thiên đường ăn vặt
            <Doodle kind="heart" class="size-[0.7em] shrink-0" />
          </span>
        </h1>

        <p class="display animate-rise mt-5 text-[clamp(17px,2vw,22px)] uppercase text-eyebrow [animation-delay:120ms]">
          Ăn vặt siêu ngon – mê là ghiền!
        </p>
        <p class="animate-rise mt-2 max-w-[48ch] text-ink-soft [animation-delay:180ms] [font-size:clamp(15px,1.6vw,17px)]">
          Chua cay mặn ngọt, làm mới mỗi ngày. Thêm món vào giỏ rồi đặt ngay trên web,
          hoặc gửi ảnh đơn qua Messenger — chốt đơn trong vài phút.
        </p>

        <div class="animate-rise mt-7 flex w-full flex-wrap justify-center gap-3.5 [animation-delay:240ms] [&>*]:min-w-[170px] max-sm:[&>*]:flex-1">
          <AppButton size="lg" href="#menu">Xem thực đơn</AppButton>
          <AppButton variant="white" size="lg" :href="SITE.messengerUrl" external>
            <IconMessenger />
            Nhắn Messenger
          </AppButton>
        </div>
      </div>

      <!-- Smaller screens: the same dishes as a row of plates under the title. -->
      <ul v-if="plates.length" class="mx-auto mt-12 grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 xl:hidden">
        <li v-for="(product, i) in plates" :key="product.id" :class="i % 2 ? 'rotate-2' : '-rotate-2'">
          <HeroPlate :product="product" />
        </li>
      </ul>
    </div>

    <!-- Tablecloth fades in under the promises row. -->
    <div class="relative pb-12 pt-8">
      <div aria-hidden="true" class="gingham absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_45%,#000_75%,transparent)]" />
      <TrustBadges class="wrap relative" />
    </div>
  </section>
</template>
