<script setup lang="ts">
/**
 * Tilted ink strip with the tastes scrolling in lime. The content is rendered
 * twice and slid by -50%, so the loop is seamless. Purely decorative.
 */
const TASTES = ['CHUA', 'CAY', 'MẶN', 'NGỌT', 'GIÒN']
// Each copy must be wider than the widest screen for the loop to stay seamless.
const REPEAT = 5
</script>

<template>
  <div aria-hidden="true" class="overflow-x-clip py-6">
    <div class="-mx-[4%] -rotate-[1.2deg] bg-ink py-3.5">
      <div class="animate-marquee flex w-max">
        <div v-for="copy in 2" :key="copy" class="flex shrink-0">
          <template v-for="n in REPEAT" :key="n">
            <span
              v-for="taste in TASTES"
              :key="taste"
              class="display flex items-center whitespace-nowrap text-[28px] text-lime"
            >
              <span class="px-4">{{ taste }}</span>
              <span class="font-sans text-[22px]">✦</span>
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
