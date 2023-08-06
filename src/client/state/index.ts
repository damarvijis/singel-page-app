import { ListProduct } from "../http/ListProduct"
import { FindProductById } from "../http/FindProductById"
import { constData } from "../const/index"
import { skipDataPagination } from "../utils/index"
import { render } from "../index"

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
      setState({ favorite: { ...state.favorite, products: [], isLoading: true } })
    } else {
      setState({ favorite: { ...state.favorite, products: [] } })
    }

    if (nextEntityState.path == "/home") {
      setState({ home: { ...state.home, products: [], inputValue: "", page: 1, isLoading: true } })
    } else {
      setState({ home: { ...state.home, products: [], inputValue: "" } })
    }

    if (nextEntityState.path == "/detail") {
      const url = new URL(window.location.href)
      const params = url.searchParams
      const paramsId = params.get("id")

      if (paramsId && Number(paramsId)) {
        setState({ detail: { ...state.detail, product: null, productId: +paramsId } })
      } else {
        setState({ detail: { ...state.detail, product: null, productId: null } })
      }
    } else {
      setState({ detail: { ...state.detail, product: null, productId: null } })
    }

    history.pushState(null, "", nextEntityState.path)
  }
  // Home
  if (prevEntityState.home.inputValue != nextEntityState.home.inputValue) {
    localStorage.setItem("inputValue", nextEntityState.home.inputValue)
    setState({ home: { ...state.home, loadingHomePage: true } })

    if (timeoutId != null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      setState({ home: { ...state.home, loadingHomePage: false, isLoading: true, page: 1 } })
    }, 500)
  }

  if (prevEntityState.home.page != nextEntityState.home.page) {
    setState({ home: { ...state.home, isLoading: true } })
  }

  if (prevEntityState.home.totalData != nextEntityState.home.totalData) {
    const totalPage = Math.floor((state.home.totalData) / constData.limit)
    setState({ home: { ...state.home, totalPage } })
  }

  if (prevEntityState.home.isLoading === false && nextEntityState.home.isLoading === true) {
    const skip = skipDataPagination(nextEntityState.home.page)
    ListProduct({ limit: constData.limit, skip, search: state.home.inputValue })
      .then((res) => res.json())
      .then((data) => {
        setState({ home: { ...state.home, isLoading: false, products: data.products, errorMessage: "", totalData: data.total } })
      })
      .catch((err) =>
        setState({ home: { ...state.home, isLoading: false, products: [], errorMessage: err.message, totalData: 0 } })
      )
  }

  // favorite
  if (prevEntityState.favorite.favoriteIds != nextEntityState.favorite.favoriteIds) {
    localStorage.setItem("favoriteIds", JSON.stringify(nextEntityState.favorite.favoriteIds))
  }

  if (prevEntityState.favorite.isLoading === false && nextEntityState.favorite.isLoading === true) {
    const fetchPromises = state.favorite.favoriteIds.map((id: number) => FindProductById({ id })
      .then(res => res.json())
      .catch((err) => {
        setState({ favorite: { ...state.favorite, isLoading: false, products: [], errorMessage: err.message } })
      })
    )
    Promise.all(fetchPromises)
      .then(res => {
        setState({ favorite: { ...state.favorite, products: res, isLoading: false, errorMessage: "" } })
      })
  }

  // detail
  if (prevEntityState.detail.isLoading === false && nextEntityState.detail.isLoading === true) {
    if (state.detail.productId) {
      FindProductById({ id: state.detail.productId })
        .then((res) => res.json())
        .then((product) => {
          setState({ detail: { ...state.detail, isLoading: false, product, errorMessage: "" } })
        })
        .catch(err => setState({ detail: { ...state.detail, isLoading: false, product: null, errorMessage: err.message } }))
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
      setState({ detail: { ...state.detail, isLoading: true } })
    }
    localStorage.setItem("productId", JSON.stringify(nextEntityState.detail.productId))
  }
}