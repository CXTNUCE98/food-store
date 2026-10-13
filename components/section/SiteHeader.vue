<script setup lang="ts">
const { count } = useCart()
const { openDrawer } = useOverlays()
</script>

<template>
  <header class="sticky top-0 z-40 border-b bg-paper">
    <div class="wrap flex min-h-[68px] items-center justify-between gap-2">
      <a href="#top" class="shrink-0 py-2" aria-label="TÓP TÉP — về đầu trang">
        <BrandLogo :size="22" />
      </a>

      <div class="flex items-center gap-1.5">
        <!-- Phones have no room for the anchors; the hero's "Xem menu" covers them there. -->
        <nav
          class="flex items-center whitespace-nowrap text-[15px] font-semibold max-[440px]:hidden"
          aria-label="Điều hướng chính"
        >
          <a href="#how" class="flex min-h-10 items-center rounded-full px-2.5 transition-colors hover:bg-ink hover:text-paper">
            Cách đặt
          </a>
          <a href="#menu" class="flex min-h-10 items-center rounded-full px-2.5 transition-colors hover:bg-ink hover:text-paper">
            Menu
          </a>
        </nav>

        <button
          type="button"
          class="press ml-1 inline-flex min-h-11 items-center gap-2 rounded-full border bg-chili pl-3.5 pr-1.5 font-bold text-ink shadow-hard-sm [&_svg]:size-5"
          :aria-label="`Mở giỏ, ${count} món`"
          @click="openDrawer"
        >
          <IconBag />
          <span>Giỏ</span>
          <span class="grid h-8 min-w-8 place-items-center rounded-full bg-ink px-1.5 text-[13px] tabular-nums text-paper">
            {{ count }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
