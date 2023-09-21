import {
  type ObjectSchema,
  type Output,
  type StringSchema,
  ValiError,
  flatten,
  parse,
} from 'valibot'

export function useForm<
  TSchema extends ObjectSchema<Record<string, StringSchema>>,
>(schema: TSchema) {
  type FieldName = keyof Output<TSchema>
  type FormFields = Record<FieldName, string>
  type FormErrors = Record<FieldName, string[]>

  const fieldsKeys: FieldName[] = Object.keys(schema.object)
  const models = reactive(
    Object.fromEntries(fieldsKeys.map(k => [k, ''])),
  ) as FormFields
  const errors = reactive(
    Object.fromEntries(fieldsKeys.map(k => [k, [] as string[]])),
  ) as FormErrors
  const isValidated = ref(false)

  function validate() {
    isValidated.value = true

    try {
      parse(schema, models)

      clearErrors()
    }
    catch (error) {
      if (error instanceof ValiError) {
        const newErrors = flatten(error).nested

        for (const k of fieldsKeys)
          errors[k] = (k in newErrors ? newErrors[k] : []) as string[]
      }
    }

    return models
  }

  watch(models, () => {
    if (isValidated.value)
      validate()
  })

  function reset() {
    for (const k of fieldsKeys)
      models[k] = ''

    clearErrors()
  }

  function clearErrors() {
    for (const k of fieldsKeys)
      errors[k] = []
  }

  return {
    errors,
    models,
    reset,
    validate,
  }
}
