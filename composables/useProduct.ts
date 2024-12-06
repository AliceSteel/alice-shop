export const useProduct = async(productSlug: number | string) => {

  const { data, error } = await useFetch(`/api/categories/products/${productSlug}`)
  if (error.value) {
    console.error('Error fetching product:', error.value)} 
  const product = data.value
  

  return product
}
