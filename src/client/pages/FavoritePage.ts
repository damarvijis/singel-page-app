import ProductList from "../components/ProductList"
import { state } from "../state"
import { sendAction, ActionTypeEnum } from "../reducer"

const FavoritePage = () => {
  const div = document.createElement("div")

  const title = document.createElement("h5")
  title.textContent = "Favorite Product"
  const productList = ProductList(state.favorite.products)
  const buttonRefetch = document.createElement("button")
  buttonRefetch.textContent = "Refetch"
  buttonRefetch.onclick = () => {
    sendAction({ type: ActionTypeEnum.REFETCH_FAVORITE })
  }

  // Loading
  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Products..."
  // error
  const errorText = document.createElement("p")
  errorText.textContent = state.favorite.errorMessage
  // empty
  const emptyText = document.createElement("p")
  emptyText.textContent = "Product Empty"

  div.append(title)
  if (state.favorite.tag == "loading") {
    div.append(loadingText)
  } else if (state.favorite.tag == "error") {
    div.append(errorText)
    div.append(buttonRefetch)
  } else if (state.favorite.tag == "empty") {
    div.append(emptyText)
  } else if (state.favorite.tag == "success") {
    div.append(productList)
  } else {
    // page 404
  }
  div.append(productList)

  return div
}

export default FavoritePage