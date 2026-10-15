<script setup lang="ts">
/** Three sticker dots hopping in turn, for spots that wait on the API. app/spa-loading-template.html mirrors it. */
withDefaults(defineProps<{ label?: string }>(), { label: 'Đang tải…' })

const DOTS = ['bg-orange', 'bg-mango', 'bg-leaf']
</script>

<template>
  <div role="status" class="flex flex-col items-center gap-3 py-10">
    <span class="flex gap-2.5" aria-hidden="true">
      <span
        v-for="(dot, i) in DOTS"
        :key="dot"
        class="size-4 animate-hop rounded-full border-2 shadow-hard-sm"
        :class="dot"
        :style="{ animationDelay: `${i * 0.15}s` }"
      />
    </span>
    <span class="text-sm font-semibold text-muted">{{ label }}</span>
  </div>
</template>
