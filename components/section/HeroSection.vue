<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatPrice, monogram } from '~/utils/format'

/** The featured product powers the hero visual on the right. */
defineProps<{ featured: Product | null }>()
const emit = defineEmits<{ play: [Product]; snap: [Product] }>()
</script>

<template>
  <section class="relative pb-10 pt-[60px]">
    <div
      class="wrap grid grid-cols-1 items-center gap-8 min-[861px]:grid-cols-[1.15fr_0.85fr] min-[861px]:gap-12"
    >
      <div>
        <span class="eyebrow">Menu trưng bày · Không đặt online</span>
        <h1
          class="display my-[18px] text-fg [font-size:clamp(40px,6.2vw,74px)] leading-[1.02] tracking-[-0.01em]"
        >
          Ăn vặt
          <span class="text-accent [font-style:var(--heading-style)]">siêu ngon</span>,<br />
          <em class="text-hot [font-style:var(--heading-style)]">mê là ghiền!</em>
        </h1>
        <p class="max-w-[46ch] text-muted [font-size:clamp(16px,2vw,19px)]">
          Lướt xem các món TÓP TÉP đang có, bấm vào để xem clip món ăn. Ưng món nào
          thì chụp lại màn hình rồi nhắn tin cho tụi mình — khỏi cần điền form, khỏi
          thanh toán online.
        </p>
        <div class="mt-[26px] flex flex-wrap gap-3">
          <ContactButtons />
          <AppButton variant="ghost" href="#menu">
            Xem menu
            <IconArrowDown />
          </AppButton>
        </div>
      </div>

      <div
        v-if="featured"
        class="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-[var(--hero-feature-bg)] shadow-soft max-[860px]:max-w-[360px] max-[860px]:[aspect-ratio:4/4.4]"
      >
        <img
          v-if="featured.thumbnail_url"
          :src="featured.thumbnail_url"
          :alt="featured.name"
          class="absolute inset-0 size-full object-cover"
          fetchpriority="high"
          decoding="async"
          width="800"
          height="1000"
        />
        <span
          v-else
          class="display absolute inset-0 grid place-items-center text-[min(42vw,300px)] text-[var(--monogram-color)]"
        >
          {{ monogram(featured.name) }}
        </span>

        <span
          class="absolute left-4 top-4 inline-flex items-center gap-[7px] rounded-full border border-[var(--hf-tag-border)] bg-[var(--hf-tag-bg)] px-[13px] py-[7px] text-xs font-bold uppercase tracking-[0.1em] text-[var(--hf-tag-ink)] shadow-soft-sm backdrop-blur-[6px]"
        >
          ★ Bán chạy
        </span>

        <div class="absolute inset-x-0 bottom-0 bg-[var(--hero-feature-caption)] p-[22px]">
          <h3 class="display text-[27px] text-white">{{ featured.name }}</h3>
          <div class="mt-0.5 font-bold text-[oklch(94%_0.12_92)]">
            {{ formatPrice(featured.price)
            }}<span class="text-[13px] opacity-85">đ / {{ featured.unit }}</span>
          </div>
          <div class="mt-3.5 flex flex-wrap gap-2.5">
            <button
              type="button"
              class="inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-white/90 px-[15px] py-[9px] text-[13px] font-bold text-fg transition-colors hover:bg-white [&_svg]:size-[15px] [&_svg]:fill-current"
              @click="emit('play', featured)"
            >
              <IconPlay />
              Xem clip
            </button>
            <button
              type="button"
              class="inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-white/90 px-[15px] py-[9px] text-[13px] font-bold text-fg transition-colors hover:bg-white"
              @click="emit('snap', featured)"
            >
              Chụp món này
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
