import { state } from "../state/index"
import Pagination from "./Pagination"
import ProductItem from "./ProductItem"
import { ProductType, StateType } from "../state/index"

const ProductList = (entity: keyof Pick<StateType, "home" | "favorite">) => {
  const pagination = Pagination()
  const productItem = state[entity]?.products.map((product: ProductType) => ProductItem(product))

  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Products..."

  const emptyText = document.createElement("p")
  emptyText.textContent = "Product Empty"

  const errorText = document.createElement("p")
  errorText.textContent = state[entity]?.errorMessage

  const div = document.createElement("div")

  if (state[entity]?.tag == "loading" || state[entity]?.tag == "debounce") {
    div.append(loadingText)
  } else if (state[entity]?.tag == "error") {
    div.append(errorText)
  } else if (state[entity]?.tag == "empty") {
    div.append(emptyText)
  } else if (state[entity]?.tag == "success") {
    div.append(...productItem)
    if (state.path == "/home" || state.path == "/") {
      div.append(pagination)
    }
  } else {
    // page 404
  }

  return div
}

export default ProductList