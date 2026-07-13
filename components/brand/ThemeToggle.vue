<script setup lang="ts">
/** Compact button that flips between the warm and dark themes. */
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="toggle"
    type="button"
    :aria-label="isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'"
    :title="isDark ? 'Giao diện sáng' : 'Giao diện tối'"
    @click="toggleTheme"
  >
    <IconSun v-if="isDark" />
    <IconMoon v-else />
  </button>
</template>

<style scoped>
.toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: border-color 0.2s, color 0.2s, transform 0.15s;
}

.toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.toggle :deep(svg) {
  width: 18px;
  height: 18px;
}
</style>
