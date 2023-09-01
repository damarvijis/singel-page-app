import { ProductType } from "../internal/type"
import Link from "./Link"
import { useAppContext } from "../context"

type ProductItemPropsType = {
  product: ProductType
  isFavorite: boolean
  toggleFavorite?: (id: number) => void
}

const ProductItem = ({
  product,
  isFavorite,
  toggleFavorite
}: ProductItemPropsType) => {
  const { onToggleFavorite, onSetUrl } = useAppContext()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px"
      }}
    >
      <img
        src={product.thumbnail}
        style={{
          width: "80px",
          height: "100px"
        }}
      />
      <h5 style={{ margin: "0 !important" }}>{product.title}</h5>
      <p>{product.description}</p>
      <button onClick={() => {
        toggleFavorite ? toggleFavorite(product.id) : onToggleFavorite(product.id)
      }}
      >
        {isFavorite ? "Delete from favorite" : "Add to favorite"}
      </button>
      <Link
        href={"/detail?id=" + product.id}
        label={"See Detail " + product.title}
        onClick={onSetUrl}
      />
    </div>
  )
}


export default ProductItem