<script setup lang="ts">
import type { Sellable } from '~/domain/types'

/**
 * "+ Thêm" button that turns into a "− n +" stepper once the item is in
 * the cart. Both states share one fixed width (or the full width with
 * `block`) so the card layout doesn't jump when it flips. Sold-out items
 * show a disabled "Hết hàng" instead.
 */
const props = withDefaults(
  defineProps<{
    item: Sellable
    label?: string
    size?: 'md' | 'lg'
    block?: boolean
  }>(),
  { label: '+ Thêm', size: 'md', block: false },
)

const { qtyOf, increment, decrement } = useCart()
const qty = computed(() => qtyOf(props.item))
const soldOut = computed(() => props.item.available <= 0)
const atMax = computed(() => qty.value >= props.item.available)
</script>

<template>
  <div :class="block ? 'w-full' : 'w-[118px] shrink-0'">
    <QtyStepper
      v-if="qty > 0"
      :qty="qty"
      :label="item.name"
      :size="size"
      :max-reached="atMax"
      block
      @increment="increment(item)"
      @decrement="decrement(item)"
    />
    <AppButton v-else-if="soldOut" variant="white" :size="size" block disabled>Hết hàng</AppButton>
    <AppButton
      v-else
      variant="primary"
      :size="size"
      block
      :aria-label="`Thêm ${item.name} vào giỏ`"
      @click="increment(item)"
    >
      {{ label }}
    </AppButton>
  </div>
</template>
