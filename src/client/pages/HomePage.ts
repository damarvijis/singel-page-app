import ProductList from "../components/ProductList"
import SearchProduct from "../components/SearchProduct"
import Pagination from "../components/Pagination"
import { sendAction, ActionTypeEnum } from "../reducer"
import { state, StateType } from "../state"
import { match } from "ts-pattern"

const HomePage = () => {
  const div = document.createElement("div")

  const title = document.createElement("h5")
  title.textContent = "List Product"
  // success
  const productList = ProductList(state.home.products)
  const searchProduct = SearchProduct()
  const buttonRefetch = document.createElement("button")
  buttonRefetch.textContent = "Refetch"
  buttonRefetch.onclick = () => {
    sendAction({ type: ActionTypeEnum.REFETCH_HOME })
  }
  // loading
  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Products..."
  // error
  const errorText = document.createElement("p")
  errorText.textContent = state.home.errorMessage
  // empty
  const emptyText = document.createElement("p")
  emptyText.textContent = "Product Empty"
  // pagination
  const pagination = Pagination(
    state.home.page,
    state.home.totalData,
    state.home.tag == "changing-page-error" ? ActionTypeEnum.RECHANGE_PAGE : ActionTypeEnum.CHANGE_PAGE
  )

  div.append(searchProduct)
  div.append(title)

  match<StateType["home"]["tag"], void>(state.home.tag)
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

export default HomePage