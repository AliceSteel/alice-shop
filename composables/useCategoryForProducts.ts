export const useCategoryForProducts = async (category:string) => {
    const { data, error } = await useFetch(`/api/categories/${category}`);
    if (error.value) {
        console.error('Error fetching product:', error.value);
    }
    const products = data.value;
    return products;
}