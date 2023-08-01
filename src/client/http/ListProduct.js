export const ListProduct = ({ limit, skip, search }) => {
  return fetch(`https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`)
}