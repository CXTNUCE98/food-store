<script setup lang="ts">
/** Combos sit above the menu; the section disappears when there are none. */
const { combos } = useCatalog()
</script>

<template>
  <section v-if="combos.length" id="combo" class="wrap pb-[clamp(48px,6vw,80px)] pt-4">
    <SectionTitle v-reveal class="reveal" eyebrow="Ăn chung cho vui" title="Combo" accent="tiết kiệm" />
    <div class="mt-10 grid gap-7 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
      <div v-for="(combo, index) in combos" :key="combo.id" v-reveal="(index % 3) * 80" class="reveal h-full">
        <ComboCard :combo="combo" />
      </div>
    </div>
  </section>
</template>
