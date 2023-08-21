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
}: ProductListPropsType) =>
(
  <>
    {
      products.map((product, idx) => {
        const isFavorite = favoriteIds.some(id => id === product.id)
        return (
          <ProductItem
            key={idx}
            product={product}
            onClickDetail={onClickDetail}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
          />
        )
      })
    }
  </>)


export default ProductList