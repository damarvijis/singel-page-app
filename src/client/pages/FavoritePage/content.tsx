import ProductList from "../../components/ProductList"
import { match } from "ts-pattern"
import Navbar from "../../components/Navbar"
import { FavoriteActionType, FavoriteStateType } from "./reducer"

type FavoriteContentPropsType = {
  send: (action: FavoriteActionType) => void
  state: FavoriteStateType
}

const FavoriteContent = ({ state, send }: FavoriteContentPropsType) =>
(
  <div>
    <Navbar />
    <h5>Favorite Product</h5>
    {
      match(state.tag)
        .with("loading", () => <p>Loading Products...</p>)
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
            onToggleFavorite={(id) => send({ type: "DELETE_FAVORITE", payload: { id } })}
          />
        )
        .otherwise(() => <p>Page not found</p>)
    }
  </div>
)


export default FavoriteContent