import { state, ProductType } from "../state/index"
import Link from "./Link"
import { sendAction, ActionTypeEnum } from "../reducer"

const ProductItem = (props: ProductType) => {
  const div = document.createElement("div")
  div.style.display = "flex"
  div.style.flexDirection = "column"
  div.style.justifyContent = "center"
  div.style.alignItems = "center"

  const image = document.createElement("img")
  image.src = props.thumbnail
  image.style.width = "80px"
  image.style.height = "100px"

  const title = document.createElement("h5")
  title.textContent = props.title

  const descriptionText = document.createElement("p")
  descriptionText.textContent = props.description

  const isFavorite = state.favorite.favoriteIds.some(id => id == props.id)
  const buttonFavorite = document.createElement("button")
  buttonFavorite.textContent = isFavorite ? "Delete from favorite" : "Add to favorite"
  buttonFavorite.onclick = () => {
    sendAction({
      type: ActionTypeEnum.TOGGLE_FAVORITE,
      payload: { id: props.id }
    })
  }

  const linkDetail = Link({
    href: "/detail?id=" + props.id,
    label: "See Detail " + props.title
  })

  div.append(image)
  div.append(title)
  div.append(buttonFavorite)
  div.append(linkDetail)
  div.append(descriptionText)

  return div
}

export default ProductItem