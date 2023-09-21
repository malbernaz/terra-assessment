<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input
    id="input"
    v-model="model"
    type="text"
    v-bind="$attrs"
    p="x-4 y-2"
    w="250px"
    bg="dark:dark-9"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  >
</template>
