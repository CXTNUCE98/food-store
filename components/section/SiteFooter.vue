<script setup lang="ts">
const { site: SITE } = useCatalog()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink pb-8 pt-14 text-paper">
    <div
      class="wrap grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))] [&_h2]:mb-3 [&_h2]:text-[13px] [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.16em] [&_h2]:text-paper/60"
    >
      <div>
        <p class="display text-[44px]">
          {{ SITE.brandLead }} <span class="text-lime">{{ SITE.brandTail }}</span>
        </p>
        <p class="mt-4 max-w-[36ch] text-[15px] text-paper/80">{{ SITE.tagline }}</p>
      </div>

      <nav aria-label="Chốt đơn" class="[&_a]:flex [&_a]:min-h-10 [&_a]:w-fit [&_a]:items-center [&_a]:font-semibold [&_a]:transition-colors hover:[&_a]:text-lime">
        <h2>Chốt đơn</h2>
        <a :href="SITE.messengerUrl" target="_blank" rel="noopener">Messenger</a>
        <a :href="SITE.instagramUrl">Instagram</a>
      </nav>

      <div class="text-[15px] text-paper/80 [&_p]:py-2">
        <h2>Thông tin</h2>
        <p>Giờ mở bán: {{ SITE.openingHours }} hằng ngày</p>
        <p>Khu vực giao: {{ SITE.deliveryArea }}</p>
        <p><NuxtLink to="/don-hang" class="font-semibold underline-offset-4 hover:text-lime hover:underline">Tra cứu đơn hàng</NuxtLink></p>
      </div>
    </div>

    <p class="wrap mt-12 border-t border-paper/20 pt-6 text-[13px] text-paper/60">
      © {{ year }} TÓP TÉP · {{ SITE.shippingNote }}
    </p>
  </footer>
</template>
