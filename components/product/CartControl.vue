<script setup lang="ts">
import type { Product } from '~/domain/types'

/**
 * "+ Thêm" button that turns into a "− n +" stepper once the product is in
 * the cart. Both states share one fixed width (or the full width with
 * `block`) so the card layout doesn't jump when it flips.
 */
const props = withDefaults(
  defineProps<{
    product: Product
    label?: string
    size?: 'md' | 'lg'
    block?: boolean
  }>(),
  { label: '+ Thêm', size: 'md', block: false },
)

const { qtyOf, increment, decrement } = useCart()
const qty = computed(() => qtyOf(props.product))
</script>

<template>
  <div :class="block ? 'w-full' : 'w-[118px] shrink-0'">
    <QtyStepper
      v-if="qty > 0"
      :qty="qty"
      :label="product.name"
      :size="size"
      block
      @increment="increment(product)"
      @decrement="decrement(product)"
    />
    <AppButton
      v-else
      variant="lime"
      :size="size"
      block
      :aria-label="`Thêm ${product.name} vào giỏ`"
      @click="increment(product)"
    >
      {{ label }}
    </AppButton>
  </div>
</template>
