import { constData } from "../../internal/const/index"
import { skipDataPagination } from "../../utils/index"
import { ListProduct } from "../../internal/http"
import { ProductType } from "../../internal/type"
import { match } from "ts-pattern"
import { useReducer, useEffect } from "react"

export type HomeStateType = {
  inputValue: string
  products: ProductType[]
  tag: "idle" | "loading" | "empty" | "success" | "error" | "changing-page-error" | "changing-page"
  errorMessage: string
  page: number
  totalData: number
}

export type HomeActionType =
  { type: "FETCH" } |
  { type: "REFETCH" } |
  { type: "RESET_HOME" } |
  { type: "CHANGE_PAGE", payload: Pick<HomeStateType, "page"> } |
  { type: "CHANGE_INPUT", payload: Pick<HomeStateType, "inputValue"> } |
  { type: "RECHANGE_PAGE", payload: Pick<HomeStateType, "page"> } |
  { type: "CHANGE_PAGE_SUCCESS", payload: Pick<HomeStateType, "products"> } |
  { type: "CHANGE_PAGE_ERROR", payload: Pick<HomeStateType, "errorMessage"> } |
  { type: "FETCH_SUCCESS", payload: Pick<HomeStateType, "products" | "totalData"> } |
  { type: "FETCH_ERROR", payload: Pick<HomeStateType, "errorMessage"> }

const reducer = (prevState: HomeStateType, action: HomeActionType): HomeStateType => {
  return match<[HomeStateType, HomeActionType], HomeStateType>([prevState, action])
    .with([{}, { type: "RESET_HOME" }],
      ([prevState, _]) => ({
        ...prevState,
        products: [],
        tag: "idle",
        errorMessage: ""
      }))
    .with([{ tag: "idle" }, { type: "FETCH" }],
      ([prevState, _]) => ({
        ...prevState,
        tag: "loading",
        errorMessage: ""
      }))
    .with([{ tag: "loading" }, { type: "CHANGE_INPUT" }],
      ([prevState, action]) => ({
        ...prevState,
        page: 1,
        inputValue: action.payload.inputValue
      }))
    .with([{ tag: "loading" }, { type: "FETCH_SUCCESS" }],
      ([prevState, action]) => ({
        ...prevState,
        products: action.payload.products,
        totalData: action.payload.totalData,
        tag: action.payload.products.length == 0 ? "empty" : "success",
        errorMessage: ""
      }))
    .with([{ tag: "loading" }, { type: "FETCH_ERROR" }],
      ([prevState, action]) => ({
        ...prevState,
        errorMessage: action.payload.errorMessage,
        products: [],
        tag: "error",
      }))
    .with([{ tag: "success" }, { type: "CHANGE_PAGE" }],
      ([prevState, action]) => ({
        ...prevState,
        page: action.payload.page,
        tag: "changing-page"
      }))
    .with([{ tag: "success" }, { type: "CHANGE_INPUT" }],
      ([prevState, action]) => ({
        ...prevState,
        page: 1,
        tag: "loading",
        inputValue: action.payload.inputValue
      }))
    .with([{ tag: "changing-page" }, { type: "CHANGE_PAGE_SUCCESS" }],
      ([prevState, action]) => ({
        ...prevState,
        products: action.payload.products,
        tag: "success"
      }))
    .with([{ tag: "changing-page" }, { type: "CHANGE_PAGE_ERROR" }],
      ([prevState, action]) => ({
        ...prevState,
        products: [],
        errorMessage: action.payload.errorMessage,
        tag: "changing-page-error"
      }))
    .with([{ tag: "empty" }, { type: "CHANGE_INPUT" }],
      ([prevState, action]) => ({
        ...prevState,
        page: 1,
        tag: "loading",
        inputValue: action.payload.inputValue
      }))
    .with([{ tag: "error" }, { type: "CHANGE_INPUT" }],
      ([prevState, action]) => ({
        ...prevState,
        page: 1,
        tag: "loading",
        inputValue: action.payload.inputValue
      }))
    .with([{ tag: "error" }, { type: "REFETCH" }],
      ([prevState, _]) => ({
        ...prevState,
        tag: "loading",
      }))
    .with([{ tag: "changing-page-error" }, { type: "RECHANGE_PAGE" }],
      ([prevState, action]) => ({
        ...prevState,
        page: action.payload.page,
        tag: "changing-page"
      }))
    .with([{ tag: "changing-page-error" }, { type: "CHANGE_INPUT" }],
      ([prevState, action]) => ({
        ...prevState,
        page: 1,
        tag: "loading",
        inputValue: action.payload.inputValue
      }))
    .otherwise(() => prevState)
}

type OnChangeStateParams = {
  state: HomeStateType
  send: (action: HomeActionType) => void
}

let timeoutId: number | null | NodeJS.Timeout

const onChangeState = ({ state, send, }: OnChangeStateParams) => {
  match(state.tag)
    .with("idle", () => send({ type: "FETCH" }))
    .with("loading", () => {
      localStorage.setItem("inputValue", state.inputValue)
      if (timeoutId != null) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        const skip = skipDataPagination(state.page)
        ListProduct({ limit: constData.limit, skip, search: state.inputValue })
          .then((res) => res.json())
          .then((data) => send({
            type: "FETCH_SUCCESS", payload: {
              products: data.products,
              totalData: data.total
            }
          })
          )
          .catch((err) =>
            send({
              type: "FETCH_ERROR", payload: {
                errorMessage: err.message
              }
            })
          )
      }, 500)
    })
    .with("changing-page", () => {
      const skip = skipDataPagination(state.page)
      ListProduct({ limit: constData.limit, skip, search: state.inputValue })
        .then((res) => res.json())
        .then((data) => {
          send({
            type: "CHANGE_PAGE_SUCCESS",
            payload: {
              products: data.products
            }
          })
        })
        .catch((err) =>
          send({
            type: "CHANGE_PAGE_ERROR",
            payload: { errorMessage: err.message }
          })
        )
    })
    .otherwise(() => { })
}

export const useHomeReducer = () => {
  const [state, send] = useReducer(reducer, {
    inputValue: localStorage.getItem("inputValue") ?? "",
    tag: "idle",
    products: [],
    errorMessage: "",
    page: 1,
    totalData: 0
  })

  useEffect(() => {
    onChangeState({
      send,
      state
    })
  }, [state])

  return { state, send }
}