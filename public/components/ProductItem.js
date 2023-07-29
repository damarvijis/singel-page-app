import { state, setState } from "../state/index.js"
import Link from "./Link.js"

const ProductItem = (props) => {
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
    if (isFavorite) {
      const newData = state.favorite.favoriteIds.filter((id) => id != props.id)
      setState({ favorite: { ...state.favorite, favoriteIds: newData }})

      if (state.path == "/favorite") {
        setState({ favorite: { ...state.favorite, isLoading: true }})
      }
    } else {
      setState({ favorite: { ...state.favorite, favoriteIds: [...state.favorite.favoriteIds, props.id] }})
    }
  }

  const linkDetail = Link({ 
    href: "/detail", 
    label: "See Detail " + props.title,
    onClick: () => {
      setState({ detail: { ...state.detail, productId: props.id }})
    }
  })

  div.append(image)
  div.append(title)
  div.append(buttonFavorite)
  div.append(linkDetail)
  div.append(descriptionText)

  return div
}

export default ProductItem