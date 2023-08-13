import ProductList from "../components/ProductList"
import { state, StateType } from "../state"
import { sendAction, ActionTypeEnum } from "../reducer"
import { match } from "ts-pattern"

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
  match<StateType["favorite"]["tag"], void>(state.favorite.tag)
    .with("loading", () => div.append(loadingText))
    .with("error", () => {
      div.append(errorText)
      div.append(buttonRefetch)
    })
    .with("empty", () => div.append(emptyText))
    .with("success", () => div.append(productList))
    .otherwise(() => { })

  return div
}

export default FavoritePage