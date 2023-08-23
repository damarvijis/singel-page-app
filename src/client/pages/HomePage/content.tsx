import ProductList from "../../components/ProductList"
import SearchProduct from "../../components/SearchProduct"
import Pagination from "../../components/Pagination"
import { match } from "ts-pattern"
import { HomeStateType, HomeActionType } from "./reducer"

type HomeContentPropsType = {
  onClickDetail: (query: Record<string, string>) => void
  favoriteIds: number[]
  onToggleFavorite: (value: number) => void
  send: (action: HomeActionType) => void
  state: HomeStateType
}

const HomeContent = ({
  state,
  send,
  onToggleFavorite,
  favoriteIds,
  onClickDetail
}: HomeContentPropsType) => {
  const actionChangePage = (page: number) => {
    send({
      type: state.tag == "changing-page-error" ? "RECHANGE_PAGE" : "CHANGE_PAGE",
      payload: { page }
    })
  }

  return (
    <div>
      <SearchProduct
        inputValue={state.inputValue}
        onInput={(inputValue) => send({ type: "CHANGE_INPUT", payload: { inputValue } })}
      />
      <h5>List Product</h5>
      {
        match(state.tag)
          .with("loading", () => <p>Loading Products...</p>)
          .with("changing-page", () =>
            <>
              <p>Loading Products...</p>
              <Pagination
                currentPage={state.page}
                totalData={state.totalData}
                action={actionChangePage}
              />
            </>
          )
          .with("error", () =>
            <div>
              <p>{state.errorMessage}</p>
              <button onClick={() => send({ type: "REFETCH" })}>Refetch</button>
            </div>
          )
          .with("changing-page-error", () =>
            <div>
              <p>{state.errorMessage}</p>
              <Pagination
                currentPage={state.page}
                totalData={state.totalData}
                action={actionChangePage}
              />
            </div>
          )
          .with("success", () =>
            <div>
              <ProductList
                products={state.products}
                onClickDetail={onClickDetail}
                onToggleFavorite={onToggleFavorite}
                favoriteIds={favoriteIds}
              />
              <Pagination
                currentPage={state.page}
                totalData={state.totalData}
                action={actionChangePage}
              />
            </div>
          )
          .otherwise(() => <p>Page not found</p>)
      }
    </div>
  )
}

export default HomeContent