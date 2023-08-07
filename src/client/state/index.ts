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
  isLoading: boolean
  loadingHomePage: boolean
  errorMessage: string
  page: number
  totalPage: number
  totalData: number
}

export type FavoriteType = {
  favoriteIds: number[]
  isLoading: boolean
  products: ProductType[]
  errorMessage: string
}

export type DetailType = {
  productId: number | null
  product: ProductType | null
  isLoading: boolean
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
    isLoading: false,
    loadingHomePage: false,
    errorMessage: "",
    page: 1,
    totalPage: 1,
    totalData: 0
  },
  favorite: {
    favoriteIds: favoriteIds ? JSON.parse(favoriteIds) : [],
    isLoading: false,
    products: [],
    errorMessage: "",
  },
  detail: {
    productId: productId ? JSON.parse(productId) : null,
    product: null,
    isLoading: false,
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
      sendAction({ type: ActionTypeEnum.FETCH_FAVORITE })
    }

    if (nextEntityState.path == "/home") {
      // RESET sama FETCH beda action type
      sendAction({ type: ActionTypeEnum.RESET_HOME })
    }
    if (nextEntityState.path == "/detail") {
      const url = new URL(window.location.href)
      const params = url.searchParams
      const paramsId = params.get("id")

      sendAction({
        type: ActionTypeEnum.SET_DETAIL,
        payload: { productId: paramsId && Number(paramsId) ? Number(paramsId) : null }
      })
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
    localStorage.setItem("inputValue", nextEntityState.home.inputValue)
    sendAction({ type: ActionTypeEnum.DEBOUNCE })

    if (timeoutId != null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      sendAction({ type: ActionTypeEnum.FETCH_HOME })
    }, 500)
  }

  if (prevEntityState.home.page != nextEntityState.home.page) {
    sendAction({ type: ActionTypeEnum.FETCH_HOME })
  }

  if (prevEntityState.home.totalData != nextEntityState.home.totalData) {
    const totalPage = Math.floor((state.home.totalData) / constData.limit)
    sendAction({
      type: ActionTypeEnum.GET_TOTAL_PAGE,
      payload: { totalPage }
    })
  }

  if (prevEntityState.home.isLoading === false && nextEntityState.home.isLoading === true) {
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

  if (prevEntityState.favorite.isLoading === false && nextEntityState.favorite.isLoading === true) {
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
  if (prevEntityState.detail.isLoading === false && nextEntityState.detail.isLoading === true) {
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