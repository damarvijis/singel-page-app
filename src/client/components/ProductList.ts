import ProductItem from "./ProductItem"
import { ProductType } from "../internal/type"

type ProductListPropsType = {
  products: ProductType[]
  onClickDetail: (query: Record<string, string>) => void
  onToggleFavorite: (id: number) => void
  favoriteIds: number[]
}

const ProductList = ({
  products,
  onClickDetail,
  onToggleFavorite,
  favoriteIds,
}: ProductListPropsType) => {
  const productItem = products.map((product) => {
    const isFavorite = favoriteIds.some(id => id === product.id)
    return ProductItem({
      product,
      onClickDetail,
      onToggleFavorite,
      isFavorite,
    })
  })
  const div = document.createElement("div")
  div.append(...productItem)

  return div
}

export default ProductList