import Link from "../../components/Link"
import DetailProduct from "../../components/DetailProduct"
import { match } from "ts-pattern"
import { DetailActionType, DetailStateType } from "./reducer"

type DetailContentPropsType = {
  onClickHome: (query: Record<string, string>) => void
  send: (action: DetailActionType) => void
  state: DetailStateType
}

const DetailContent = ({ send, state, onClickHome }: DetailContentPropsType) => {
  return (
    <div>
      <Link
        href="/home"
        label="Back to Home"
        onClick={onClickHome}
      />
      {
        match(state.tag)
          .with("loading", () => <p>Loading Products...</p>)
          .with("error", () =>
            <>
              <p>{state.errorMessage}</p>
              <button onClick={() => send({ type: "REFETCH" })}>Refetch</button>
            </>
          )
          .with("success", () => {
            if (state.product) {
              return (
                <>
                  <p>{"ini detail product " + state.product.title}</p>
                  <DetailProduct product={state.product} />
                </>
              )
            }
          })
          .otherwise(() => <p>Page not found</p>)
      }
    </div>
  )
}

export default DetailContent