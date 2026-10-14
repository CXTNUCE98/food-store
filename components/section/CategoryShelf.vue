<script setup lang="ts">
import type { MenuGroup } from '~/composables/useMenu'

/**
 * "Hôm nay ăn gì?" shelf: one round bubble per category (its accent colour
 * around a dish from it) jumping to that block of the menu, plus a combo
 * bubble when there are combos. Scrolls sideways on phones.
 */
const { groups } = useMenu()
const { combos } = useCatalog()

/** A dish with a real photo stands in for the category when there is one. */
const coverOf = (g: MenuGroup) => g.products.find((p) => p.thumbnail_url) ?? g.products[0]!
</script>

<template>
  <section class="wrap pt-[clamp(32px,5vw,64px)]" aria-labelledby="shelf-title">
    <SectionTitle v-reveal class="reveal" eyebrow="Hôm nay ăn gì?" title="Chọn theo" accent="danh mục" title-id="shelf-title" />

    <ul class="-mx-5 mt-9 flex gap-4 overflow-x-auto px-5 pb-4 pt-2 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible">
      <li v-for="(g, i) in groups" :key="g.category.id" v-reveal="i * 60" class="reveal shrink-0">
        <a :href="`#${categoryAnchor(g.category.id)}`" class="group flex w-[104px] flex-col items-center text-center sm:w-[120px]">
          <span
            class="relative grid size-[96px] place-items-center rounded-full border-[3px] shadow-hard transition-transform duration-200 group-hover:-translate-y-1 sm:size-[112px]"
            :style="{ background: g.category.color }"
          >
            <ProductThumb :product="coverOf(g)" square :show-label="false" :width="100" class="size-[72%] rounded-full border-2" />
            <span class="absolute -right-1 -top-1 grid h-7 min-w-7 place-items-center rounded-full border-2 bg-white px-1 text-[13px] font-extrabold tabular-nums">
              {{ g.products.length }}
            </span>
          </span>
          <span class="display mt-3 text-[17px] leading-tight group-hover:text-orange-deep">{{ g.category.label }}</span>
        </a>
      </li>
      <li v-if="combos.length" v-reveal="groups.length * 60" class="reveal shrink-0">
        <a href="#combo" class="group flex w-[104px] flex-col items-center text-center sm:w-[120px]">
          <span
            class="candy-fill display relative grid size-[96px] place-items-center rounded-full border-[3px] text-[22px] leading-none shadow-hard transition-transform duration-200 group-hover:-translate-y-1 sm:size-[112px]"
          >
            <span class="absolute inset-[6px] rounded-full border-2 border-dashed border-white/80" />
            Combo
            <span class="absolute -right-1 -top-1 grid h-7 min-w-7 place-items-center rounded-full border-2 bg-white px-1 font-sans text-[13px] font-extrabold tabular-nums text-ink [text-shadow:none]">
              {{ combos.length }}
            </span>
          </span>
          <span class="display mt-3 text-[17px] leading-tight group-hover:text-orange-deep">Tiết kiệm</span>
        </a>
      </li>
    </ul>
  </section>
</template>
