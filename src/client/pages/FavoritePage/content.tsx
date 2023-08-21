import ProductList from "../../components/ProductList"
import { match } from "ts-pattern"
import { FavoriteActionType, FavoriteStateType } from "./reducer"

type FavoriteContentPropsType = {
  send: (action: FavoriteActionType) => void
  state: FavoriteStateType
  favoriteIds: number[]
  onClickDetail: (query: Record<string, string>) => void
}

const FavoriteContent = ({ state, send, onClickDetail, favoriteIds }: FavoriteContentPropsType) =>
(
  <div>
    <h5>Favorite Product</h5>
    {
      match(state.tag)
        .with("loading" || "changing-page", () => <p>Loading Products...</p>)
        .with("error", () =>
          <div>
            <p>
              {
                match(state)
                  .with({ tag: "error" }, (state) => state.errorMessage)
                  .otherwise(() => "")
              }
            </p>
            <button onClick={() => send({ type: "REFETCH" })}>Refetch</button>
          </div>
        )
        .with("empty", () => <p>Product Empty</p>)
        .with("success", () =>
          <ProductList
            products={
              match(state)
                .with({ tag: "success" }, (state) => state.products)
                .with({ tag: "deleting" }, (state) => state.products)
                .otherwise(() => [])
            }
            onClickDetail={onClickDetail}
            onToggleFavorite={(id) => send({ type: "DELETE_FAVORITE", payload: { id } })}
            favoriteIds={favoriteIds}
          />
        )
        .otherwise(() => <p>Page not found</p>)
    }
  </div>
)


export default FavoriteContent