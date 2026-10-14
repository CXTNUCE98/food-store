<script setup lang="ts">
/**
 * Combos: the first one as a big spotlight, the rest stacked beside it as
 * compact rows. The section disappears when there are none.
 */
const { combos } = useCatalog()
const lead = computed(() => combos.value[0] ?? null)
const rest = computed(() => combos.value.slice(1))
</script>

<template>
  <section v-if="lead" id="combo" class="wrap pt-[clamp(56px,7vw,96px)]">
    <SectionTitle v-reveal class="reveal" eyebrow="Ăn chung cho vui" title="Combo" accent="tiết kiệm" />
    <div class="mt-10 grid items-start gap-7" :class="rest.length && 'lg:grid-cols-[1.5fr_1fr]'">
      <div v-reveal class="reveal h-full">
        <ComboCard :combo="lead" layout="spotlight" />
      </div>
      <ul v-if="rest.length" class="flex flex-col gap-5">
        <li v-for="(combo, index) in rest" :key="combo.id" v-reveal="(index + 1) * 80" class="reveal">
          <ComboCard :combo="combo" />
        </li>
      </ul>
    </div>
  </section>
</template>
