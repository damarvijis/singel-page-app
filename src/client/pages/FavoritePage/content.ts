import ProductList from "../../components/ProductList"
import { match } from "ts-pattern"
import { FavoriteActionType, FavoriteStateType } from "./reducer"

type FavoriteContentPropsType = {
  send: (action: FavoriteActionType) => void
  state: FavoriteStateType
  favoriteIds: number[]
  onClickDetail: (query: Record<string, string>) => void
}

const FavoriteContent = ({ state, send, onClickDetail, favoriteIds }: FavoriteContentPropsType) => {
  const div = document.createElement("div")

  const title = document.createElement("h5")
  title.textContent = "Favorite Product"

  const productList = ProductList({
    products: match(state)
      .with({ tag: "success" }, (state) => state.products)
      .with({ tag: "deleting" }, (state) => state.products)
      .otherwise(() => [])
    ,
    onClickDetail,
    onToggleFavorite: (id) => send({ type: "DELETE_FAVORITE", payload: { id } }),
    favoriteIds
  })

  const buttonRefetch = document.createElement("button")
  buttonRefetch.textContent = "Refetch"
  buttonRefetch.onclick = () => {
    send({ type: "REFETCH" })
  }

  // Loading
  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Products..."
  // error
  const errorText = document.createElement("p")
  errorText.textContent = match(state)
    .with({ tag: "error" }, (state) => state.errorMessage)
    .otherwise(() => "")
  // empty
  const emptyText = document.createElement("p")
  emptyText.textContent = "Product Empty"

  div.append(title)
  match(state.tag)
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

export default FavoriteContent