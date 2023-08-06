import ProductList from "../components/ProductList"
import SearchProduct from "../components/SearchProduct"

const HomePage = () => {
  const div = document.createElement("div")
  const title = document.createElement("h5")
  title.textContent = "List Product"

  const productList = ProductList("home")
  const searchProduct = SearchProduct()
  div.append(searchProduct)
  div.append(title)
  div.append(productList)

  return div
}

export default HomePage