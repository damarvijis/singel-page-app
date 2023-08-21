type ListProductParamsType = {
  limit: number
  skip: number
  search: string
}

type ProductIdParamsType = {
  id: number
}

export const ListProduct = (params: ListProductParamsType) => {
  const { limit, skip, search } = params
  return fetch(`https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`)
}

export const FindProductById = (params: ProductIdParamsType) => {
  return fetch("https://dummyjson.com/products/" + params.id)
}