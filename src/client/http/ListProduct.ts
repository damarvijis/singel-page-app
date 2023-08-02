type ListProductParamsType = {
  limit: number
  skip: number
  search: string
}

export const ListProduct = (params: ListProductParamsType) => {
  const { limit, skip, search } = params
  return fetch(`https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`)
}