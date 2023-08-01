export const FindProductById = ({ id }) => {
  return fetch("https://dummyjson.com/products/" + id)
}