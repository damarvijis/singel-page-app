import Link from "../../components/Link"
import DetailProduct from "../../components/DetailProduct"
import { match } from "ts-pattern"
import { DetailActionType, DetailStateType } from "./reducer"

type DetailContentPropsType = {
  onClickHome: (query: Record<string, string>) => void
  send: (action: DetailActionType) => void
  state: DetailStateType
}

const DetailContent = ({ send, state, onClickHome }: DetailContentPropsType) => {
  const div = document.createElement("div")
  const linkBack = Link({
    href: "/home",
    label: "Back to Home",
    onClick: onClickHome,
  })
  const buttonRefetch = document.createElement("button")
  buttonRefetch.textContent = "Refetch"
  buttonRefetch.onclick = () => {
    send({ type: "REFETCH" })
  }
  // Loading
  const loadingText = document.createElement("p")
  loadingText.textContent = "Loading Product..."
  // error
  const errorText = document.createElement("p")
  errorText.textContent = state.errorMessage
  // success
  const successText = document.createElement("p")

  div.append(linkBack)

  match(state.tag)
    .with("loading", () => div.append(loadingText))
    .with("error", () => {
      div.append(errorText)
      div.append(buttonRefetch)
    })
    .with("success", () => {
      if (state.product) {
        successText.textContent = "ini detail product " + state.product.title
        const product = DetailProduct(state.product)
        div.append(successText)
        div.append(product)
      }
    })
    .otherwise(() => { })
  return div
}

export default DetailContent