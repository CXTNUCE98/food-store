<script setup lang="ts">
import { SITE } from '~/domain/constants'

/**
 * The Messenger call-to-action, reused in the hero, FAB, and both modals.
 * `messengerLabel` lets each spot tweak the wording.
 */
withDefaults(defineProps<{ messengerLabel?: string }>(), {
  messengerLabel: 'Nhắn Messenger',
})
</script>

<template>
  <AppButton variant="gold" :href="SITE.messengerUrl" external>
    <IconMessenger />
    {{ messengerLabel }}
  </AppButton>
</template>
