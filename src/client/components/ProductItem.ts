import { ProductType } from "../internal/type"
import Link from "./Link"

type ProductItemPropsType = {
  product: ProductType
  onClickDetail: (query: Record<string, string>) => void
  onToggleFavorite: (id: number) => void
  isFavorite: boolean
}

const ProductItem = ({
  product,
  onClickDetail,
  onToggleFavorite,
  isFavorite,
}: ProductItemPropsType) => {
  const div = document.createElement("div")
  div.style.display = "flex"
  div.style.flexDirection = "column"
  div.style.justifyContent = "center"
  div.style.alignItems = "center"

  const image = document.createElement("img")
  image.src = product.thumbnail
  image.style.width = "80px"
  image.style.height = "100px"

  const title = document.createElement("h5")
  title.textContent = product.title

  const descriptionText = document.createElement("p")
  descriptionText.textContent = product.description

  const buttonFavorite = document.createElement("button")
  buttonFavorite.textContent = isFavorite ? "Delete from favorite" : "Add to favorite"
  buttonFavorite.onclick = () => onToggleFavorite(product.id)

  const linkDetail = Link({
    href: "/detail?id=" + product.id,
    label: "See Detail " + product.title,
    onClick: onClickDetail,
  })

  div.append(image)
  div.append(title)
  div.append(buttonFavorite)
  div.append(linkDetail)
  div.append(descriptionText)

  return div
}

export default ProductItem