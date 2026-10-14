<script setup lang="ts">
/**
 * The single button primitive used across the site: a pill sticker with a
 * chocolate border and a 3D drop that presses in on click. `primary` is the
 * glossy orange of the banner lettering.
 * Renders as <a> when `href` is given, otherwise a real <button>.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'ink' | 'white' | 'mango' | 'chili'
    size?: 'md' | 'lg'
    href?: string
    /** When set, opens the link in a new tab with safe rel. */
    external?: boolean
    type?: 'button' | 'submit'
    /** Stretch to the full width of the parent. */
    block?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', external: false, block: false, disabled: false },
)

const base =
  'press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-extrabold shadow-hard-sm disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-[18px] [&_svg]:shrink-0'

const sizes = {
  md: 'min-h-11 px-5 text-[15px]',
  lg: 'min-h-[52px] px-6 text-base',
}

const variants = {
  primary: 'candy-fill',
  ink: 'bg-ink text-paper',
  white: 'bg-white text-ink',
  mango: 'bg-mango text-ink',
  chili: 'bg-chili text-white',
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
