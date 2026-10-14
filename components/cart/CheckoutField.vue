<script setup lang="ts">
/** Labelled sticker input for the checkout form; shows the error under the field. */
const model = defineModel<string>({ required: true })
defineProps<{
  label: string
  type?: string
  autocomplete?: string
  inputmode?: 'text' | 'tel' | 'numeric'
  placeholder?: string
  error?: string
  multiline?: boolean
}>()
const id = useId()
</script>

<template>
  <div>
    <label :for="id" class="mb-1.5 block text-sm font-bold">{{ label }}</label>
    <textarea
      v-if="multiline"
      :id="id"
      v-model="model"
      rows="2"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      class="w-full resize-none rounded-2xl border bg-white px-4 py-3 text-base outline-none focus:border-orange-deep focus:shadow-[0_0_0_4px_rgba(255,122,26,0.25)]"
      :class="error && 'border-eyebrow'"
    />
    <input
      v-else
      :id="id"
      v-model="model"
      :type="type ?? 'text'"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      class="min-h-12 w-full rounded-full border bg-white px-4 text-base outline-none focus:border-orange-deep focus:shadow-[0_0_0_4px_rgba(255,122,26,0.25)]"
      :class="error && 'border-eyebrow'"
    />
    <p v-if="error" class="mt-1 text-[13px] font-semibold text-eyebrow">{{ error }}</p>
  </div>
</template>
