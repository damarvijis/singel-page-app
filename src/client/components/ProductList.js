import { state } from "../state/index.js"
import Pagination from "./Pagination.js"
import ProductItem from "./ProductItem.js"

const ProductList = (entity) => {
  const pagination = Pagination()
  const productItem = state[entity].products.map(product => ProductItem(product))

  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Products..."

  const emptyText = document.createElement("p")
  emptyText.textContent = "Product Empty"

  const errorText = document.createElement("p")
  errorText.textContent = state[entity].errorMessage

  const div = document.createElement("div")

  if (state[entity].isLoading || state.home.loadingHomePage) {
    div.append(loadingText)
  } else if (state[entity].errorMessage != "") {
    div.append(errorText)
  } else if (state[entity].products.length == 0) {
    div.append(emptyText)
  } else {
    div.append(...productItem)
    if (state.path == "/home" || state.path == "/") {
      div.append(pagination)
    }
  }

  return div
}

export default ProductList