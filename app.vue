<script setup lang="ts">
// Initialize the theme before the page renders so the correct CSS variables
// are applied on first paint (and restored from the persisted cookie on reload).
useTheme()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
