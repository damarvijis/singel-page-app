import ProductItem from "./ProductItem"
import { ProductType } from "../internal/type"
import { useAppContext } from "../context"

type ProductListPropsType = {
  products: ProductType[]
  onToggleFavorite?: (id: number) => void
}

const ProductList = ({
  products,
  onToggleFavorite
}: ProductListPropsType) => {
  const { favoriteIds } = useAppContext()

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