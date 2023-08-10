import ProductList from "../components/ProductList"
import SearchProduct from "../components/SearchProduct"
import Pagination from "../components/Pagination"
import { sendAction, ActionTypeEnum } from "../reducer"
import { state } from "../state"

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

  if (state.home.tag == "loading" || state.home.tag == "changing-page") {
    div.append(loadingText)
  } else if (state.home.tag == "error") {
    div.append(errorText)
    div.append(buttonRefetch)
  } else if (state.home.tag == "empty") {
    div.append(emptyText)
  } else if (state.home.tag == "success") {
    div.append(productList)
    div.append(pagination)
  } else if (state.home.tag == "changing-page-error") {
    div.append(errorText)
    div.append(pagination)
  } else {
    // page 404
  }

  return div
}

export default HomePage