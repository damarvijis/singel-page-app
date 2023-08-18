import ProductList from "../../components/ProductList"
import SearchProduct from "../../components/SearchProduct"
import Pagination from "../../components/Pagination"
import { match } from "ts-pattern"
import { HomeStateType, HomeActionType } from "./reducer"

type HomeContentPropsType = {
  onClickDetail: (query: Record<string, string>) => void
  favoriteIds: number[]
  onToggleFavorite: (value: number) => void
  send: (action: HomeActionType) => void
  state: HomeStateType
}

const HomeContent = ({
  state,
  send,
  onToggleFavorite,
  favoriteIds,
  onClickDetail
}: HomeContentPropsType) => {
  const actionChangePage = (page: number) => {
    send({
      type: state.tag == "changing-page-error" ? "RECHANGE_PAGE" : "CHANGE_PAGE",
      payload: { page }
    })
  }

  const div = document.createElement("div")

  const title = document.createElement("h5")
  title.textContent = "List Product"
  // success
  const productList = ProductList({
    products: state.products,
    onClickDetail: onClickDetail,
    onToggleFavorite: onToggleFavorite,
    favoriteIds: favoriteIds
  })
  const searchProduct = SearchProduct({
    inputValue: state.inputValue,
    onInput: (inputValue) => send({ type: "CHANGE_INPUT", payload: { inputValue } })
  })
  const buttonRefetch = document.createElement("button")
  buttonRefetch.textContent = "Refetch"
  buttonRefetch.onclick = () => {
    send({ type: "REFETCH" })
  }
  // loading
  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Products..."
  // error
  const errorText = document.createElement("p")
  errorText.textContent = state.errorMessage
  // empty
  const emptyText = document.createElement("p")
  emptyText.textContent = "Product Empty"
  // pagination
  const pagination = Pagination(
    state.page,
    state.totalData,
    actionChangePage
  )

  div.append(searchProduct)
  div.append(title)

  match(state.tag)
    .with("loading" || "changing-page", () => div.append(loadingText))
    .with("empty", () => div.append(emptyText))
    .with("error", () => {
      div.append(errorText)
      div.append(buttonRefetch)
    })
    .with("changing-page-error", () => {
      div.append(errorText)
      div.append(pagination)
    })
    .with("success", () => {
      div.append(productList)
      div.append(pagination)
    })
    .otherwise(() => { })

  return div
}

export default HomeContent