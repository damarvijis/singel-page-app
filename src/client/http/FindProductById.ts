type ProductIdParamsType = {
  id: number
}

export const FindProductById = (params: ProductIdParamsType) => {
  return fetch("https://dummyjson.com/products/" + params.id)
}