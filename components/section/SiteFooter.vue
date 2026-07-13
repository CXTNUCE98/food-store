<script setup lang="ts">
import { SITE } from '~/domain/constants'

const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="wrap foot-grid">
      <div class="foot-brand">
        <BrandLogo :size="26" />
        <p>{{ SITE.tagline }}</p>
      </div>
      <div>
        <h5>Chốt đơn</h5>
        <a :href="SITE.messengerUrl" target="_blank" rel="noopener">Messenger</a>
        <a :href="SITE.zaloUrl">Zalo</a>
        <a :href="SITE.instagramUrl">Instagram</a>
      </div>
      <div>
        <h5>Thông tin</h5>
        <a href="#menu">Menu hôm nay</a>
        <a href="#">Khu vực giao</a>
        <a href="#">Giờ mở bán</a>
      </div>
    </div>
    <div class="wrap copyr">
      © {{ year }} TÓP TÉP · Giá là số mẫu, cập nhật theo menu thực tế.
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 72px;
  border-top: 1px solid var(--border);
  padding: 48px 0 32px;
}

.foot-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 32px;
}

.foot-grid h5 {
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 14px;
  font-weight: 700;
}

.foot-grid a {
  display: block;
  color: var(--muted);
  padding: 5px 0;
  transition: color 0.15s;
}

.foot-grid a:hover {
  color: var(--accent);
}

.foot-brand p {
  color: var(--muted);
  font-size: 14px;
  margin-top: 10px;
  max-width: 34ch;
}

.copyr {
  margin-top: 36px;
  color: var(--faint);
  font-size: 12.5px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}

@media (max-width: 680px) {
  .foot-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
