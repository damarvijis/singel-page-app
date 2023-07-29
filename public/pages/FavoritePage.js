import ProductList from "../components/ProductList.js"

const FavoritePage = () => {
  const div = document.createElement("div")

  const title = document.createElement("h5")
  title.textContent = "Favorite Product"
  const productList = ProductList("favorite")

  div.append(title)
  div.append(productList)

  return div
}

export default FavoritePage