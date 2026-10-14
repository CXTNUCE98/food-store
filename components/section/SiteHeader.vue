<script setup lang="ts">
import { SITE_NAME } from '~/site.config'

const { count } = useCart()
const { openDrawer } = useOverlays()
</script>

<template>
  <header class="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm">
    <div class="wrap flex min-h-[72px] items-center justify-between gap-2">
      <a href="#top" class="shrink-0 py-2" :aria-label="`${SITE_NAME} — về đầu trang`">
        <BrandLogo :size="28" />
      </a>

      <div class="flex items-center gap-1.5">
        <!-- Phones have no room for the anchors; the hero's "Xem menu" covers them there. -->
        <nav
          class="flex items-center whitespace-nowrap text-[15px] font-extrabold max-[480px]:hidden"
          aria-label="Điều hướng chính"
        >
          <a href="#how" class="flex min-h-10 items-center rounded-full px-3 transition-colors hover:bg-cream">
            Cách đặt
          </a>
          <a href="#menu" class="flex min-h-10 items-center rounded-full px-3 transition-colors hover:bg-cream">
            Menu
          </a>
          <NuxtLink to="/don-hang" class="flex min-h-10 items-center rounded-full px-3 transition-colors hover:bg-cream max-sm:hidden">
            Tra đơn
          </NuxtLink>
        </nav>

        <button
          type="button"
          class="candy-fill press ml-1 inline-flex min-h-11 items-center gap-2 rounded-full border pl-3.5 pr-1.5 font-extrabold shadow-hard-sm [&_svg]:size-5"
          :aria-label="`Mở giỏ, ${count} món`"
          @click="openDrawer"
        >
          <IconBag />
          <span>Giỏ</span>
          <span class="grid h-8 min-w-8 place-items-center rounded-full border-2 bg-white px-1.5 text-[13px] tabular-nums text-ink [text-shadow:none]">
            {{ count }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
