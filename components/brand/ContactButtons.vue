<script setup lang="ts">
import { SITE } from '~/domain/constants'

/**
 * The Messenger + Zalo call-to-action pair, reused in the hero, FAB,
 * and both modals. `messengerLabel` / `zaloLabel` let each spot tweak wording.
 */
withDefaults(
  defineProps<{ messengerLabel?: string; zaloLabel?: string }>(),
  { messengerLabel: 'Nhắn Messenger', zaloLabel: 'Nhắn Zalo' },
)
</script>

<template>
  <AppButton variant="gold" :href="SITE.messengerUrl" external>
    <IconMessenger />
    {{ messengerLabel }}
  </AppButton>
  <AppButton variant="ghost" :href="SITE.zaloUrl">
    <IconZalo />
    {{ zaloLabel }}
  </AppButton>
</template>
