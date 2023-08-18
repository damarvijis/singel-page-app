import ProductItem from "./ProductItem"
import { ProductType } from "../state/index"

// lempar product langsung
const ProductList = (data: ProductType[]) => {
  const productItem = data.map((product: ProductType) => ProductItem(product))
  const div = document.createElement("div")
  div.append(...productItem)

  return div
}

export default ProductList