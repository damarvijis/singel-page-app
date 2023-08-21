import { match } from "ts-pattern"
import { ProductType } from "../../internal/type"
import { React } from "../../React"
import { FindProductById } from "../../internal/http"

type FavoriteReducerPropsType = {
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
  path: string
}

export type FavoriteStateType =
  { tag: "idle" } |
  { tag: "loading" } |
  { tag: "empty" } |
  { tag: "success", products: ProductType[] } |
  { tag: "error", errorMessage: string } |
  { tag: "deleting", deleteId: number, products: ProductType[] }

export type FavoriteActionType =
  { type: "FETCH" } |
  { type: "REFETCH" } |
  { type: "RESET_FAVORITE" } |
  { type: "DELETE_FAVORITE", payload: { id: number } } |
  { type: "DELETE_FAVORITE_SUCCESS" } |
  { type: "FETCH_SUCCESS", payload: { products: ProductType[] } } |
  { type: "FETCH_ERROR", payload: { errorMessage: string } }

const reducer = (prevState: FavoriteStateType, action: FavoriteActionType): FavoriteStateType => {
  return match<[FavoriteStateType, FavoriteActionType], FavoriteStateType>([prevState, action])
    .with([{}, { type: "RESET_FAVORITE" }],
      ([prevState, _]) => ({
        ...prevState,
        products: [],
        tag: "idle",
        errorMessage: ""
      }))
    .with([{ tag: "idle" }, { type: "FETCH" }],
      ([prevState, _]) => ({
        ...prevState,
        products: [],
        tag: "loading",
        errorMessage: ""
      }))
    .with([{ tag: "loading" }, { type: "FETCH_SUCCESS" }],
      ([prevState, action]) => ({
        ...prevState,
        products: action.payload.products,
        tag: action.payload.products.length == 0 ? "empty" : "success",
        errorMessage: ""
      }))
    .with([{ tag: "loading" }, { type: "FETCH_ERROR" }],
      ([prevState, action]) => ({
        ...prevState,
        products: [],
        tag: "error",
        errorMessage: action.payload.errorMessage
      }))
    .with([{ tag: "success" }, { type: "DELETE_FAVORITE" }],
      ([prevState, action]) => ({
        ...prevState,
        tag: "deleting",
        deleteId: action.payload.id
      }))
    .with([{ tag: "deleting" }, { type: "DELETE_FAVORITE_SUCCESS" }],
      ([prevState, _]) => ({
        ...prevState,
        tag: "loading",
        deleteId: null
      }))
    .with([{ tag: "error" }, { type: "REFETCH" }],
      ([prevState, _]) => ({
        ...prevState,
        tag: "loading",
      }))
    .otherwise(() => prevState)
}

type OnChangeStateParams = {
  state: FavoriteStateType
  send: (action: FavoriteActionType) => void
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

const onChangeState = ({ state, send, favoriteIds, onToggleFavorite }: OnChangeStateParams) => {
  match(state)
    .with({ tag: "idle" }, () => send({ type: "FETCH" }))
    .with({ tag: "loading" }, () => {
      const fetchPromises = favoriteIds.map(id => FindProductById({ id })
        .then(res => res.json())
        .catch((err) =>
          send({
            type: "FETCH_ERROR",
            payload: { errorMessage: err.message }
          })
        )
      )
      Promise.all(fetchPromises)
        .then(res => {
          send({
            type: "FETCH_SUCCESS",
            payload: { products: res }
          })
        }).catch(err => send({
          type: "FETCH_ERROR",
          payload: { errorMessage: err.message }
        }))
    })
    .with({ tag: "deleting" }, (state) => {
      if (favoriteIds.length === state.products.length) {
        onToggleFavorite(state.deleteId)
        send({ type: "DELETE_FAVORITE_SUCCESS" })
      }
    })
    .otherwise(() => { })
}

export const useFavoriteReducer = (props: FavoriteReducerPropsType) => {
  const [state, send] = React.useReducer(reducer, {
    tag: "idle"
  })

  React.useEffect(() => {
    if (props.path != "/favorite") {
      state.tag != "idle" && send({ type: "RESET_FAVORITE" })
    } else {
      onChangeState({
        ...props,
        send,
        state
      })
    }
  }, [state, props.favoriteIds, props.path])

  return { state, send }
}