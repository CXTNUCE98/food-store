<script setup lang="ts">
/**
 * The single button primitive used across the site.
 * Renders as <a> when `href` is given, otherwise a real <button>.
 * Variants: gold (primary accent) and ghost (outlined).
 */
withDefaults(
  defineProps<{
    variant?: 'gold' | 'ghost'
    href?: string
    /** When set, opens the link in a new tab with safe rel. */
    external?: boolean
    type?: 'button' | 'submit'
  }>(),
  { variant: 'gold', type: 'button', external: false },
)
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    class="btn"
    :class="`btn-${variant}`"
  >
    <slot />
  </a>
  <button v-else :type="type" class="btn" :class="`btn-${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 22px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 15px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s, color 0.2s;
  white-space: nowrap;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-gold {
  background: var(--accent);
  color: var(--accent-ink);
  box-shadow: var(--shadow-sm);
}

.btn-gold:hover {
  background: var(--accent-hover);
}

.btn-ghost {
  background: var(--surface);
  color: var(--fg);
  border-color: var(--border);
}

.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.btn :deep(svg) {
  width: 18px;
  height: 18px;
}
</style>
