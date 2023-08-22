import ProductItem from "./ProductItem"
import { ProductType } from "../internal/type"
import { AppContext } from "../context"
import { useContext } from "react"

type ProductListPropsType = {
  products: ProductType[]
  onToggleFavorite?: (id: number) => void
}

const ProductList = ({
  products,
  onToggleFavorite
}: ProductListPropsType) => {
  const { favoriteIds } = useContext(AppContext)

  return (
    <>
      {
        products.map((product, idx) => {
          const isFavorite = favoriteIds.some(id => id === product.id)
          return (
            <ProductItem
              key={idx}
              toggleFavorite={onToggleFavorite}
              product={product}
              isFavorite={isFavorite}
            />
          )
        })
      }
    </>)
}



export default ProductList