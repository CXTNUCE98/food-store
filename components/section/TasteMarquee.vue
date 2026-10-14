<script setup lang="ts">
/**
 * Tilted glossy-orange ribbon with the tastes scrolling in white. The content
 * is rendered twice and slid by -50%, so the loop is seamless. Purely decorative.
 */
const TASTES = ['CHUA', 'CAY', 'MẶN', 'NGỌT', 'GIÒN']
// Each copy must be wider than the widest screen for the loop to stay seamless.
const REPEAT = 5
</script>

<template>
  <div aria-hidden="true" class="overflow-x-clip py-8">
    <div class="candy-fill -mx-[4%] -rotate-[1.2deg] border-y-[3px] py-3 shadow-hard">
      <div class="animate-marquee flex w-max">
        <div v-for="copy in 2" :key="copy" class="flex shrink-0">
          <template v-for="n in REPEAT" :key="n">
            <span
              v-for="taste in TASTES"
              :key="taste"
              class="display flex items-center whitespace-nowrap text-[28px] tracking-[0.04em]"
            >
              <span class="px-5">{{ taste }}</span>
              <span class="text-[20px] text-mango [text-shadow:none]">♥</span>
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
