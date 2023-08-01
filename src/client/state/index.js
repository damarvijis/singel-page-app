import { ListProduct } from "../http/ListProduct.js"
import { FindProductById } from "../http/FindProductById.js"
import { constData } from "../const/index.js"
import { skipDataPagination } from "../utils/index.js"
import { render } from "../index.js"

let timeoutId = null

export let state = {
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
    favoriteIds: JSON.parse(localStorage.getItem("favoriteIds")) ?? [],
    isLoading: false,
    products: [],
    errorMessage: "",
  },
  detail: {
    productId: JSON.parse(localStorage.getItem("productId")) ?? null,
    product: null,
    isLoading: false,
    errorMessage: "",
  }
}

export const setState = (newState) => {
  const prevState = { ...state }
  const nextState = { ...prevState, ...newState }
  state = nextState
  render()
  onChangeState(prevState, nextState)
}

export const onChangeState = (prevEntityState, nextEntityState) => {
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
        setState({ detail: { ...state.detail, product: null, productId: paramsId } })
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
    const totalPage = Math.floor(state.home.totalData / constData.limit)
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
    const fetchPromises = state.favorite.favoriteIds.map(id => FindProductById({ id })
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
      window.history.pushState(null, "", url)
    } else {
      const params = new URLSearchParams()
      params.set("id", nextEntityState.detail.productId)
      url.search = params.toString()
      window.history.pushState(null, "", url)
      setState({ detail: { ...state.detail, isLoading: true } })
    }
    localStorage.setItem("productId", JSON.stringify(nextEntityState.detail.productId))
  }
}