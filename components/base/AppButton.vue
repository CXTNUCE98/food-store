<script setup lang="ts">
/**
 * The single button primitive used across the site.
 * Renders as <a> when `href` is given, otherwise a real <button>.
 * Variants: gold (primary accent) and ghost (outlined).
 */
const props = withDefaults(
  defineProps<{
    variant?: 'gold' | 'ghost'
    href?: string
    /** When set, opens the link in a new tab with safe rel. */
    external?: boolean
    type?: 'button' | 'submit'
  }>(),
  { variant: 'gold', type: 'button', external: false },
)

const base =
  'inline-flex items-center gap-[9px] whitespace-nowrap rounded-full border-[1.5px] px-[22px] py-[13px] text-[15px] font-bold cursor-pointer transition-[transform,background,border-color,color,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.97] [&_svg]:size-[18px]'

const variants = {
  gold: 'border-transparent bg-accent text-accent-ink shadow-soft-sm hover:bg-accent-hover',
  ghost: 'border-border bg-surface text-fg hover:border-accent hover:text-accent',
}

const classes = computed(() => [base, variants[props.variant]])
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    :class="classes"
  >
    <slot />
  </a>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>
