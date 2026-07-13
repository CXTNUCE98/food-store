<template>
  <header>
    <div class="wrap bar">
      <BrandLogo :size="28" show-sub />
      <div class="right">
        <span class="hnote">
          <span class="dot" />
          Chọn món → chụp màn hình → nhắn tin là xong
        </span>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
}

.right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.hnote {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  font-weight: 500;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--fresh);
  box-shadow: 0 0 10px var(--fresh);
}

@media (max-width: 680px) {
  .hnote {
    display: none;
  }
}
</style>
