export default async () => {
  const { data, error } = await useFetch('/api/categoryMeta')

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: 'Could not fetch categories'
    })
  }
  return data.value
}
