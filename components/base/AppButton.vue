<script setup lang="ts">
/**
 * The single button primitive used across the site: a pill sticker with an
 * ink border and a hard shadow that presses in on click.
 * Renders as <a> when `href` is given, otherwise a real <button>.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'lime' | 'ink' | 'white' | 'chili'
    size?: 'md' | 'lg'
    href?: string
    /** When set, opens the link in a new tab with safe rel. */
    external?: boolean
    type?: 'button' | 'submit'
    /** Stretch to the full width of the parent. */
    block?: boolean
    disabled?: boolean
  }>(),
  { variant: 'lime', size: 'md', type: 'button', external: false, block: false, disabled: false },
)

const base =
  'press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-bold shadow-hard-sm disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-[18px] [&_svg]:shrink-0'

const sizes = {
  md: 'min-h-11 px-5 text-[15px]',
  lg: 'min-h-[52px] px-6 text-base',
}

const variants = {
  lime: 'bg-lime text-ink',
  ink: 'bg-ink text-paper',
  white: 'bg-white text-ink',
  chili: 'bg-chili text-ink',
}

const classes = computed(() => [
  base,
  sizes[props.size],
  variants[props.variant],
  props.block && 'w-full',
])
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
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
