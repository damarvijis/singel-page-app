import ProductList from "../components/ProductList.js"
import SearchProduct from "../components/SearchProduct.js"

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