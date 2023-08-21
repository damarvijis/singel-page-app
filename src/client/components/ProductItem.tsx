import { ProductType } from "../internal/type"
import Link from "./Link"

type ProductItemPropsType = {
  product: ProductType
  onClickDetail: (query: Record<string, string>) => void
  onToggleFavorite: (id: number) => void
  isFavorite: boolean
}

const ProductItem = ({
  product,
  onClickDetail,
  onToggleFavorite,
  isFavorite,
}: ProductItemPropsType) => (
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
    <button onClick={() => onToggleFavorite(product.id)}>{isFavorite ? "Delete from favorite" : "Add to favorite"}</button>
    <Link
      href={"/detail?id=" + product.id}
      label={"See Detail " + product.title}
      onClick={onClickDetail}
    />
  </div>
)


export default ProductItem