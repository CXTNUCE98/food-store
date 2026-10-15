<script setup lang="ts">
import { SITE_NAME } from '~/site.config'

/**
 * Two-tier header: a chocolate info strip (scrolls away) over the sticky shop
 * bar — nav on the left, the wordmark centered like a shop sign, Messenger and
 * the cart on the right. Links point at the home page so they work from every page.
 */
const { count } = useCart()
const { openDrawer } = useOverlays()
const { site } = useCatalog()
const route = useRoute()

/** A click on the URL we're already at is a no-op for the router: scroll to the target ourselves (top for the logo). */
function rescroll(hash = '') {
  if (route.path !== '/' || route.hash !== hash) return
  if (hash) document.querySelector(hash)?.scrollIntoView()
  else window.scrollTo({ top: 0 })
}
</script>

<template>
  <div class="bg-ink text-[13px] font-bold text-paper">
    <div class="wrap flex min-h-9 items-center justify-center gap-x-6 overflow-hidden whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-mango">
      <span class="flex items-center gap-1.5"><IconTruck /> Giao nhanh {{ site.deliveryArea }}</span>
      <span class="flex items-center gap-1.5 max-sm:hidden"><IconLeaf /> Làm mới mỗi ngày</span>
      <span class="flex items-center gap-1.5 max-md:hidden"><IconHeadset /> Mở bán {{ site.openingHours }}</span>
    </div>
  </div>

  <header class="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm">
    <div class="wrap grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-2">
      <nav class="flex items-center gap-1 text-[15px] font-extrabold max-lg:hidden" aria-label="Điều hướng chính">
        <NuxtLink to="/#menu" class="rounded-full px-3 py-2 transition-colors hover:bg-cream" @click="rescroll('#menu')">Thực đơn</NuxtLink>
        <NuxtLink to="/#combo" class="rounded-full px-3 py-2 transition-colors hover:bg-cream" @click="rescroll('#combo')">Combo</NuxtLink>
        <NuxtLink to="/#how" class="rounded-full px-3 py-2 transition-colors hover:bg-cream" @click="rescroll('#how')">Cách đặt</NuxtLink>
      </nav>
      <!-- Phones: Messenger takes the left slot so the sign stays centered. -->
      <a
        :href="site.messengerUrl"
        target="_blank"
        rel="noopener"
        aria-label="Nhắn Messenger"
        class="press grid size-11 place-items-center rounded-full border bg-white shadow-hard-sm lg:hidden [&_svg]:size-5"
      >
        <IconMessenger />
      </a>

      <NuxtLink to="/" class="justify-self-center py-2" :aria-label="`${SITE_NAME} — về trang chủ`" @click="rescroll()">
        <BrandLogo :size="30" />
      </NuxtLink>

      <div class="flex items-center justify-end gap-2">
        <NuxtLink to="/don-hang" class="rounded-full px-3 py-2 text-[15px] font-extrabold transition-colors hover:bg-cream max-lg:hidden">
          Tra đơn
        </NuxtLink>
        <AppButton variant="white" :href="site.messengerUrl" external class="max-lg:hidden">
          <IconMessenger />
          Nhắn shop
        </AppButton>
        <button
          type="button"
          class="candy-fill press relative grid size-11 place-items-center rounded-full border shadow-hard-sm [&_svg]:size-5"
          :aria-label="`Mở giỏ, ${count} món`"
          @click="openDrawer"
        >
          <IconBag />
          <span
            class="absolute -right-1.5 -top-1.5 grid h-6 min-w-6 place-items-center rounded-full border-2 bg-mango px-1 text-[12px] font-extrabold tabular-nums text-ink [text-shadow:none]"
          >
            {{ count }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
