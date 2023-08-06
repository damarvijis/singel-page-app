import { ProductType } from "../state"

const DetailProduct = (props: ProductType) => {
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

  const categoryText = document.createElement("p")
  categoryText.textContent = "Category: " + props.category

  const brandText = document.createElement("p")
  brandText.textContent = "Brand: " + props.brand

  const priceText = document.createElement("p")
  priceText.textContent = "Price: $" + props.price

  const descriptionText = document.createElement("p")
  descriptionText.textContent = props.description

  div.append(image)
  div.append(title)
  div.append(categoryText)
  div.append(brandText)
  div.append(priceText)
  div.append(descriptionText)

  return div
}

export default DetailProduct