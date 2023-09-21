<script setup lang="ts">
import * as v from 'valibot'
import { useForm } from '~/composables/useForm'

const { handleSubmit = () => {} } = defineProps<{
  handleSubmit?: (input: v.Output<typeof LoginSchema>) => void | Promise<void>
}>()

const LoginSchema = v.object({
  email: v.string([v.email()]),
  password: v.string([
    v.minLength(32, 'Password length should be at least 32.'),
  ]),
})

const { validate, errors, models } = useForm(LoginSchema)
</script>

<template>
  <div
    border="~ rounded gray-200 dark:gray-8"
    mx-auto
    max-w-320px
    px-4
    py-5
    dark:bg-dark-800
  >
    <form grid gap-3 @submit.prevent="() => handleSubmit(validate())">
      <Field
        v-model="models.email"
        name="email"
        label="Email"
        :errors="errors.email"
      />
      <Field
        v-model="models.password"
        name="password"
        label="Password"
        type="password"
        :errors="errors.password"
      />
      <button mt-4 btn type="submit">
        Sign In
      </button>
    </form>
  </div>
</template>
