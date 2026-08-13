<template>
  <header
    class="sticky top-0 z-40 border-b border-border bg-[var(--header-bg)] backdrop-blur-[14px]"
  >
    <div class="wrap flex items-center justify-between gap-4 py-3.5">
      <BrandLogo :size="28" show-sub />
      <nav class="hidden items-center gap-6 text-sm font-semibold text-muted min-[901px]:flex">
        <a href="#how" class="transition-colors hover:text-accent">Cách đặt</a>
        <a href="#menu" class="transition-colors hover:text-accent">Menu</a>
      </nav>
      <div class="flex items-center gap-3.5">
        <span class="hidden items-center gap-2 text-[13px] font-medium text-muted min-[681px]:flex">
          <span
            class="size-[7px] rounded-full bg-fresh shadow-[0_0_10px_var(--fresh)]"
          />
          Chọn món → chụp màn hình → nhắn tin là xong
        </span>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
