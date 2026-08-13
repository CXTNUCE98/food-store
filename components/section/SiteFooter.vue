<script setup lang="ts">
import { SITE } from '~/domain/constants'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-[72px] border-t border-border pb-8 pt-12">
    <div
      class="wrap grid grid-cols-1 gap-8 min-[681px]:grid-cols-[1.4fr_1fr_1fr] [&_h5]:mb-3.5 [&_h5]:text-[13px] [&_h5]:font-bold [&_h5]:uppercase [&_h5]:tracking-[0.16em] [&_h5]:text-faint"
    >
      <div v-reveal class="reveal">
        <BrandLogo :size="26" />
        <p class="mt-2.5 max-w-[34ch] text-sm text-muted">{{ SITE.tagline }}</p>
      </div>
      <nav
        v-reveal="110"
        class="reveal [&_a]:block [&_a]:w-fit [&_a]:py-[5px] [&_a]:text-muted [&_a]:transition-all hover:[&_a]:translate-x-1 hover:[&_a]:text-accent"
      >
        <h5>Chốt đơn</h5>
        <a :href="SITE.messengerUrl" target="_blank" rel="noopener">Messenger</a>
        <a :href="SITE.instagramUrl">Instagram</a>
      </nav>
      <nav
        v-reveal="220"
        class="reveal [&_a]:block [&_a]:w-fit [&_a]:py-[5px] [&_a]:text-muted [&_a]:transition-all hover:[&_a]:translate-x-1 hover:[&_a]:text-accent"
      >
        <h5>Thông tin</h5>
        <a href="#menu">Menu hôm nay</a>
        <p class="py-[5px] text-muted">Giờ mở bán: 9:00 – 21:00 hằng ngày</p>
        <p class="py-[5px] text-muted">Khu vực giao: nội thành, freeship &lt; 3km</p>
      </nav>
    </div>
    <div class="wrap mt-9 border-t border-border pt-5 text-[12.5px] text-faint">
      © {{ year }} TÓP TÉP · Giá là số mẫu, cập nhật theo menu thực tế.
    </div>
  </footer>
</template>
