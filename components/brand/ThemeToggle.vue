<script setup lang="ts">
/** Compact button that flips between the warm and dark themes. */
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="grid size-10 cursor-pointer place-items-center rounded-full border-[1.5px] border-border bg-surface text-fg transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent [&_svg]:size-[18px]"
    :aria-label="isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'"
    :title="isDark ? 'Giao diện sáng' : 'Giao diện tối'"
    @click="toggleTheme"
  >
    <IconSun v-if="isDark" />
    <IconMoon v-else />
  </button>
</template>
