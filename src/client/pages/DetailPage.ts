import { state } from "../state/index"
import Link from "../components/Link"
import DetailProduct from "../components/DetailProduct"

const DetailPage = () => {
  const div = document.createElement("div")
  const text = document.createElement("p")
  text.textContent = "gaada product nya cuy"

  const linkBack = Link({ href: "/home", label: "Back to Home" })

  div.append(linkBack)
  div.append(text)

  if (state.detail.product) {
    text.textContent = "ini detail product " + state.detail.product.title

    const product = DetailProduct(state.detail.product)
    div.append(product)
  }

  return div
}

export default DetailPage