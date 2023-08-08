import { ListProduct } from "../http/ListProduct"
import { FindProductById } from "../http/FindProductById"
import { constData } from "../const/index"
import { skipDataPagination } from "../utils/index"
import { render } from "../index"
import { sendAction, ActionTypeEnum } from "../reducer"

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
  tag: "idle" | "loading" | "empty" | "success" | "error" | "debounce"
  errorMessage: string
  page: number
  totalPage: number
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
    totalPage: 1,
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
  // path
  if (prevEntityState.path != nextEntityState.path) {
    if (nextEntityState.path == "/favorite") {
      switch (nextEntityState.favorite.tag) {
        case "idle":
        case "success":
          sendAction({ type: ActionTypeEnum.FETCH_FAVORITE })
          break;

        default:
          break;
      }
    }

    if (nextEntityState.path == "/home" || nextEntityState.path == "/") {
      switch (nextEntityState.home.tag) {
        case "idle":
        case "success":
          sendAction({ type: ActionTypeEnum.RESET_HOME })
          break;

        default:
          break;
      }
    }

    if (nextEntityState.path == "/detail") {
      const url = new URL(window.location.href)
      const params = url.searchParams
      const paramsId = params.get("id")

      switch (nextEntityState.detail.tag) {
        case "idle":
        case "success":
          sendAction({
            type: ActionTypeEnum.SET_DETAIL,
            payload: { productId: paramsId && Number(paramsId) ? Number(paramsId) : null }
          })
          break;

        default:
          break;
      }

    } else {
      sendAction({
        type: ActionTypeEnum.SET_DETAIL,
        payload: { productId: null }
      })
    }

    history.pushState(null, "", nextEntityState.path)
  }
  // Home
  if (prevEntityState.home.inputValue != nextEntityState.home.inputValue) {

    switch (nextEntityState.home.tag) {
      case "success":
        localStorage.setItem("inputValue", nextEntityState.home.inputValue)
        sendAction({ type: ActionTypeEnum.DEBOUNCE })

        if (timeoutId != null) {
          clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
          sendAction({ type: ActionTypeEnum.FETCH_HOME })
        }, 500)
        break;

      default:
        break;
    }
  }

  if (prevEntityState.home.page != nextEntityState.home.page) {
    switch (nextEntityState.home.tag) {
      case "success":
        sendAction({ type: ActionTypeEnum.FETCH_HOME })
    }
  }

  if (prevEntityState.home.totalData != nextEntityState.home.totalData) {
    switch (nextEntityState.home.tag) {
      case "success":
        const totalPage = Math.floor((state.home.totalData) / constData.limit)
        sendAction({
          type: ActionTypeEnum.GET_TOTAL_PAGE,
          payload: { totalPage }
        })
    }
  }

  if (nextEntityState.home.tag == "loading") {
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
  }

  // favorite
  if (prevEntityState.favorite.favoriteIds != nextEntityState.favorite.favoriteIds) {
    localStorage.setItem("favoriteIds", JSON.stringify(nextEntityState.favorite.favoriteIds))
  }

  if (nextEntityState.favorite.tag === "loading") {
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
  }

  // detail
  if (nextEntityState.detail.tag === "loading") {
    if (state.detail.productId) {
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
    }
  }

  if (prevEntityState.detail.productId != nextEntityState.detail.productId) {
    switch (nextEntityState.detail.tag) {
      case "idle":
      case "success":
        const url = new URL(window.location.href)
        if (nextEntityState.detail.productId == null) {
          url.search = ''
          window.history.pushState(null, "", url.toString())
        } else {
          const params = new URLSearchParams()
          params.set("id", JSON.stringify(nextEntityState.detail.productId))
          url.search = params.toString()
          window.history.pushState(null, "", url.toString())
          sendAction({ type: ActionTypeEnum.FETCH_DETAIL })
        }
        localStorage.setItem("productId", JSON.stringify(nextEntityState.detail.productId))
    }
  }
}