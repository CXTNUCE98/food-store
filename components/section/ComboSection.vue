<script setup lang="ts">
/** Combos sit above the menu; the section disappears when there are none. */
const { combos } = useCatalog()
</script>

<template>
  <section v-if="combos.length" id="combo" class="wrap pb-[clamp(48px,6vw,80px)]">
    <div v-reveal class="reveal">
      <p class="eyebrow">Ăn chung cho vui</p>
      <h2 class="display mt-3 text-[clamp(36px,5vw,56px)]">Combo tiết kiệm</h2>
    </div>
    <div class="mt-9 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
      <div v-for="(combo, index) in combos" :key="combo.id" v-reveal="(index % 3) * 80" class="reveal h-full">
        <ComboCard :combo="combo" />
      </div>
    </div>
  </section>
</template>
