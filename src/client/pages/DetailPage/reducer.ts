import { match } from "ts-pattern"
import { ProductType } from "../../internal/type"
import { useReducer, useEffect } from "react"
import { FindProductById } from "../../internal/http"

type DetailReducerPropsType = {
  query: Record<string, string>
}

export type DetailStateType = {
  product: ProductType | null
  tag: "idle" | "loading" | "success" | "error"
  errorMessage: string
}

export type DetailActionType =
  { type: "FETCH" } |
  { type: "REFETCH" } |
  { type: "RESET_DETAIL" } |
  { type: "FETCH_SUCCESS", payload: { product: ProductType } } |
  { type: "FETCH_ERROR", payload: { errorMessage: string } }

const reducer = (prevState: DetailStateType, action: DetailActionType): DetailStateType => {
  return match<[DetailStateType, DetailActionType], DetailStateType>([prevState, action])
    .with([{}, { type: "RESET_DETAIL" }],
      ([prevState, _]) => ({
        ...prevState,
        product: null,
        tag: "idle",
        errorMessage: ""
      }))
    .with([{ tag: "idle" }, { type: "FETCH" }],
      ([prevState, _]) => ({
        ...prevState,
        products: [],
        tag: "loading"
      }))
    .with([{ tag: "loading" }, { type: "FETCH_SUCCESS" }],
      ([prevState, action]) => ({
        ...prevState,
        product: action.payload.product,
        tag: "success",
        errorMessage: ""
      }))
    .with([{ tag: "loading" }, { type: "FETCH_ERROR" }],
      ([prevState, action]) => ({
        ...prevState,
        tag: "error",
        errorMessage: action.payload.errorMessage
      }))
    .with([{ tag: "error" }, { type: "REFETCH" }],
      ([prevState, _]) => ({
        ...prevState,
        tag: "loading",
      }))
    .otherwise(() => prevState)
}

type OnChangeStateParams = {
  state: DetailStateType
  send: (action: DetailActionType) => void
  query: Record<string, string>
}

const onChangeState = ({ state, send, query }: OnChangeStateParams) => {
  match(state)
    .with({ tag: "idle" }, () => send({ type: "FETCH" }))
    .with({ tag: "loading" }, () => {
      if (query.id)
        FindProductById({ id: Number(query.id) })
          .then((res) => res.json())
          .then((product) => {
            send({
              type: "FETCH_SUCCESS",
              payload: { product }
            })
          })
          .catch(err => send({
            type: "FETCH_ERROR",
            payload: { errorMessage: err.message }
          }))
      else
        send({
          type: "FETCH_ERROR",
          payload: { errorMessage: "Masukin product_id woi!" }
        })
    })
    .otherwise(() => { })
}

export const useDetailReducer = (props: DetailReducerPropsType) => {
  const [state, send] = useReducer(reducer, {
    product: null,
    tag: "idle",
    errorMessage: ""
  })

  useEffect(() => {
    onChangeState({
      ...props,
      send,
      state
    })
  }, [state, props.query])

  return { state, send }
}