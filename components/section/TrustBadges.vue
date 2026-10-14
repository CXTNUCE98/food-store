<script setup lang="ts">
/** The shop's promises as dashed cream tiles, the row along the bottom of the banner. */
const BADGES = [
  { icon: resolveComponent('IconAward'), text: 'Nguyên liệu chất lượng' },
  { icon: resolveComponent('IconLeaf'), text: 'Không chất bảo quản' },
  { icon: resolveComponent('IconTruck'), text: 'Giao hàng nhanh chóng' },
  { icon: resolveComponent('IconShield'), text: 'Đảm bảo an toàn' },
  { icon: resolveComponent('IconHeadset'), text: 'Tư vấn nhiệt tình' },
]
</script>

<template>
  <ul class="flex flex-wrap justify-center gap-3" aria-label="Cam kết của shop">
    <li
      v-for="badge in BADGES"
      :key="badge.text"
      class="flex grow basis-[150px] items-center gap-3 rounded-2xl border-2 border-dashed bg-white/90 px-3.5 py-3 lg:grow-0 lg:basis-auto"
    >
      <component :is="badge.icon" class="size-8 shrink-0 text-ink" />
      <span class="max-w-[12ch] text-[13px] font-extrabold uppercase leading-tight tracking-[0.02em]">{{ badge.text }}</span>
    </li>
  </ul>
</template>
