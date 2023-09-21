<script setup lang="ts">
const { name, label, errors, type = 'text' } = defineProps<{
  name: string
  label: string
  errors: string[]
  type?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <label :for="name" text-left>
    {{ label }}
    <Input
      :id="name"
      v-model="model"
      :type="type"
      mt-2
      w-full
      :class="{ 'border-red-4': !!errors.length }"
    />
    <div v-for="e of errors" :key="e" p-1 text-sm text-red-4>
      {{ e }}
    </div>
  </label>
</template>
