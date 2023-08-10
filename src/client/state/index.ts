import { ListProduct } from "../http/ListProduct"
import { constData } from "../const/index"
import { skipDataPagination } from "../utils/index"
import { render } from "../index"
import { sendAction, ActionTypeEnum } from "../reducer"
import { FindProductById } from "../http/FindProductById"

export type ProductType = {
  id: number
  title: string
  thumbnail: string
  category: string
  brand: string
  description: string
  price: number
}

export type HomeType = {
  inputValue: string
  products: ProductType[]
  tag: "idle" | "loading" | "empty" | "success" | "error" | "changing-page-error" | "changing-page"
  errorMessage: string
  page: number
  totalData: number
}

export type FavoriteType = {
  favoriteIds: number[]
  tag: "idle" | "loading" | "empty" | "success" | "error"
  products: ProductType[]
  errorMessage: string
}

export type DetailType = {
  productId: number | null
  product: ProductType | null
  tag: "idle" | "loading" | "success" | "error"
  errorMessage: string
}

export type StateType = {
  path: string
  home: HomeType
  favorite: FavoriteType
  detail: DetailType
}

let timeoutId: NodeJS.Timeout | null = null;
const favoriteIds = localStorage.getItem("favoriteIds")
const productId = localStorage.getItem("productId")

export let state: StateType = {
  path: window.location.pathname,
  home: {
    inputValue: localStorage.getItem("inputValue") ?? "",
    products: [],
    tag: "idle",
    errorMessage: "",
    page: 1,
    totalData: 0
  },
  favorite: {
    favoriteIds: favoriteIds ? JSON.parse(favoriteIds) : [],
    tag: "idle",
    products: [],
    errorMessage: "",
  },
  detail: {
    productId: productId ? JSON.parse(productId) : null,
    product: null,
    tag: "idle",
    errorMessage: "",
  }
}

export const setState = (newState: Partial<StateType>) => {
  const prevState = { ...state }
  const nextState = { ...prevState, ...newState }
  state = nextState
  render()
  onChangeState(prevState, nextState)
}

export const onChangeState = (prevEntityState: StateType, nextEntityState: StateType) => {
  // reset state on change path
  if (prevEntityState.path != nextEntityState.path) {
    sendAction({ type: ActionTypeEnum.RESET_HOME })
    sendAction({ type: ActionTypeEnum.RESET_FAVORITE })

    if (nextEntityState.path != "/detail") {
      sendAction({ type: ActionTypeEnum.RESET_DETAIL })
    }

    history.pushState(null, "", nextEntityState.path)
  }
  // global side effect
  if (prevEntityState.favorite.favoriteIds != nextEntityState.favorite.favoriteIds) {
    localStorage.setItem("favoriteIds", JSON.stringify(nextEntityState.favorite.favoriteIds))
  }

  if (prevEntityState.detail.productId != nextEntityState.detail.productId) {
    const url = new URL(window.location.href)
    if (nextEntityState.detail.productId == null) {
      url.search = ''
    } else {
      const params = new URLSearchParams()
      params.set("id", JSON.stringify(nextEntityState.detail.productId))
      url.search = params.toString()
    }
    window.history.pushState(null, "", url.toString())
    localStorage.setItem("productId", JSON.stringify(nextEntityState.detail.productId))
  }
  // home
  if (nextEntityState.path == "/home" || nextEntityState.path == "/") {
    switch (nextEntityState.home.tag) {
      case "idle":
        sendAction({ type: ActionTypeEnum.FETCH_HOME })
        break;
      case "loading":
        localStorage.setItem("inputValue", nextEntityState.home.inputValue)
        if (timeoutId != null) {
          clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
          const skip = skipDataPagination(nextEntityState.home.page)
          ListProduct({ limit: constData.limit, skip, search: state.home.inputValue })
            .then((res) => res.json())
            .then((data) => {
              sendAction({
                type: ActionTypeEnum.FETCH_HOME_SUCCESS,
                payload: {
                  products: data.products,
                  totalData: data.total
                }
              })
            })
            .catch((err) =>
              sendAction({
                type: ActionTypeEnum.FETCH_HOME_ERROR,
                payload: { errorMessage: err.message }
              })
            )
        }, 500)
        break;
      case "changing-page":
        const skip = skipDataPagination(nextEntityState.home.page)
        ListProduct({ limit: constData.limit, skip, search: state.home.inputValue })
          .then((res) => res.json())
          .then((data) => {
            sendAction({
              type: ActionTypeEnum.CHANGE_PAGE_SUCCESS,
              payload: {
                products: data.products
              }
            })
          })
          .catch((err) =>
            sendAction({
              type: ActionTypeEnum.CHANGE_PAGE_ERROR,
              payload: { errorMessage: err.message }
            })
          )
        break;
      default:
        break;
    }
  }
  // favorite
  if (nextEntityState.path == "/favorite") {
    switch (nextEntityState.favorite.tag) {
      case "idle":
        sendAction({ type: ActionTypeEnum.FETCH_FAVORITE })
        break;
      case "loading":
        const fetchPromises = state.favorite.favoriteIds.map((id: number) => FindProductById({ id })
          .then(res => res.json())
          .catch((err) =>
            sendAction({
              type: ActionTypeEnum.FETCH_FAVORITE_ERROR,
              payload: { errorMessage: err.message }
            })
          )
        )
        Promise.all(fetchPromises)
          .then(res => {
            sendAction({
              type: ActionTypeEnum.FETCH_FAVORITE_SUCCESS,
              payload: { products: res }
            })
          }).catch(err => sendAction({
            type: ActionTypeEnum.FETCH_FAVORITE_ERROR,
            payload: { errorMessage: err.message }
          }))

      default:
        break;
    }
  }
  // detail
  if (nextEntityState.path == "/detail") {
    switch (nextEntityState.detail.tag) {
      case "loading":
        if (state.detail.productId)
          FindProductById({ id: state.detail.productId })
            .then((res) => res.json())
            .then((product) => {
              sendAction({
                type: ActionTypeEnum.FETCH_DETAIL_SUCCESS,
                payload: { product }
              })
            })
            .catch(err => sendAction({
              type: ActionTypeEnum.FETCH_DETAIL_ERROR,
              payload: { errorMessage: err.message }
            }))
        else
          sendAction({
            type: ActionTypeEnum.FETCH_DETAIL_ERROR,
            payload: { errorMessage: "Masukin product_id woi!" }
          })
        break;

      default:
        break;
    }

  }
}