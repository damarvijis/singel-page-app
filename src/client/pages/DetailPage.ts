import { state } from "../state/index"
import Link from "../components/Link"
import DetailProduct from "../components/DetailProduct"
import { sendAction, ActionTypeEnum } from "../reducer"

const DetailPage = () => {
  const div = document.createElement("div")
  const linkBack = Link({ href: "/home", label: "Back to Home" })
  const buttonRefetch = document.createElement("button")
  buttonRefetch.textContent = "Refetch"
  buttonRefetch.onclick = () => {
    sendAction({ type: ActionTypeEnum.REFETCH_DETAIL })
  }
  // Loading
  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Product..."
  // error
  const errorText = document.createElement("p")
  errorText.textContent = state.detail.errorMessage
  // success
  const successText = document.createElement("p")

  div.append(linkBack)

  if (state.detail.tag == "loading") {
    div.append(loadingText)
  } else if (state.detail.tag == "error") {
    div.append(errorText)
    div.append(buttonRefetch)
  } else if (state.detail.tag == "success") {
    if (state.detail.product) {
      successText.textContent = "ini detail product " + state.detail.product.title
      const product = DetailProduct(state.detail.product)
      div.append(successText)
      div.append(product)
    }
  } else {
    // page 404
  }
  return div
}

export default DetailPage