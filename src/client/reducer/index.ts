import { setState, state, StateType, HomeType, DetailType, FavoriteType, ProductType } from "../state";
import { match } from "ts-pattern"

export enum ActionTypeEnum {
  TOGGLE_FAVORITE = "toggle_favorite",
  NAVIGATE = "navigate",
  // HOME
  FETCH_HOME = "fetch_home",
  REFETCH_HOME = "refetch_home",
  RESET_HOME = "reset_home",
  FETCH_HOME_SUCCESS = "fetch_home_success",
  FETCH_HOME_ERROR = "fetch_home_error",
  CHANGE_INPUT = "change_input",
  CHANGE_PAGE_SUCCESS = "change_page_success",
  CHANGE_PAGE_ERROR = "change_page_error",
  RECHANGE_PAGE = "rechange_page",
  CHANGE_PAGE = "change_page",
  GET_TOTAL_PAGE = "get_total_page",
  // DETAIL
  FETCH_DETAIL = "fetch_detail",
  RESET_DETAIL = "reset_detail",
  REFETCH_DETAIL = "refetch_detail",
  FETCH_DETAIL_SUCCESS = "fetch_detail_success",
  FETCH_DETAIL_ERROR = "fetch_detail_error",
  // FAVORITE
  RESET_FAVORITE = "reset_favorite",
  FETCH_FAVORITE = "fetch_favorite",
  REFETCH_FAVORITE = "refetch_favorite",
  FETCH_FAVORITE_SUCCESS = "fetch_favorite_success",
  FETCH_FAVORITE_ERROR = "fetch_favorite_error"
}

/*
type ActionType = 
| { type: "fetch"} }
| { type: "fetchSuccess", payload: {} }
| { type: "fetchError", payload: {  } }
*/

type ActionNavigateType = {
  type: ActionTypeEnum.NAVIGATE
  payload: Pick<StateType, "path" | "query">
}

type ActionAddFavoriteType = {
  type: ActionTypeEnum.TOGGLE_FAVORITE
  payload: Pick<ProductType, "id">
}

type ActionResetFavoriteType = {
  type: ActionTypeEnum.RESET_FAVORITE
}

type ActionFetchHomeType = {
  type: ActionTypeEnum.FETCH_HOME
}

type ActionRefetchHomeType = {
  type: ActionTypeEnum.REFETCH_HOME
}

type ActionRechangePageHomeType = {
  type: ActionTypeEnum.RECHANGE_PAGE
  payload: Pick<HomeType, "page">
}

type ActionChangePageHomeSuccessType = {
  type: ActionTypeEnum.CHANGE_PAGE_SUCCESS
  payload: Pick<HomeType, "products">
}

type ActionChangePageHomeErrorType = {
  type: ActionTypeEnum.CHANGE_PAGE_ERROR
  payload: Pick<HomeType, "errorMessage">
}

type ActionResetHomeType = {
  type: ActionTypeEnum.RESET_HOME
}

type ActionFetchHomeSuccessType = {
  type: ActionTypeEnum.FETCH_HOME_SUCCESS
  payload: Pick<HomeType, "products" | "totalData">
}

type ActionChangeInputType = {
  type: ActionTypeEnum.CHANGE_INPUT
  payload: Pick<HomeType, "inputValue">
}

type ActionChangePageType = {
  type: ActionTypeEnum.CHANGE_PAGE
  payload: Pick<HomeType, "page">
}

type ActionFetchHomeErrorType = {
  type: ActionTypeEnum.FETCH_HOME_ERROR
  payload: Pick<HomeType, "errorMessage">
}

type ActionSetDetailType = {
  type: ActionTypeEnum.FETCH_DETAIL
}

type ActionResetDetailType = {
  type: ActionTypeEnum.RESET_DETAIL
}

type ActionRefetchDetailType = {
  type: ActionTypeEnum.REFETCH_DETAIL
}


type ActionFetchDetailSuccessType = {
  type: ActionTypeEnum.FETCH_DETAIL_SUCCESS
  payload: Pick<DetailType, "product">
}

type ActionFetchDetailErrorType = {
  type: ActionTypeEnum.FETCH_DETAIL_ERROR
  payload: Pick<DetailType, "errorMessage">
}

type ActionFetchFavoriteType = {
  type: ActionTypeEnum.FETCH_FAVORITE
}

type ActionRefetchFavoriteType = {
  type: ActionTypeEnum.REFETCH_FAVORITE
}

type ActionFetchFavoriteSuccessType = {
  type: ActionTypeEnum.FETCH_FAVORITE_SUCCESS
  payload: Pick<FavoriteType, "products">
}

type ActionFetchFavoriteErrorType = {
  type: ActionTypeEnum.FETCH_FAVORITE_ERROR
  payload: Pick<FavoriteType, "errorMessage">
}

export type ActionType =
  ActionRechangePageHomeType |
  ActionChangePageHomeSuccessType |
  ActionChangePageHomeErrorType |
  ActionNavigateType |
  ActionAddFavoriteType |
  ActionChangeInputType |
  ActionChangePageType |
  ActionResetHomeType |
  ActionResetFavoriteType |
  ActionFetchHomeType |
  ActionRefetchHomeType |
  ActionFetchHomeSuccessType |
  ActionFetchHomeErrorType |
  ActionFetchFavoriteType |
  ActionRefetchFavoriteType |
  ActionFetchFavoriteSuccessType |
  ActionFetchFavoriteErrorType |
  ActionResetDetailType |
  ActionSetDetailType |
  ActionRefetchDetailType |
  ActionFetchDetailSuccessType |
  ActionFetchDetailErrorType

const reducer = (prevState: StateType, action: ActionType): StateType => {
  /*
   Finite State Machine dibuat per-entity (action dibatasi dari tag) | Dari Interface contoh: idle -> loading -> success. gabisa kaya success -> idle
   Perbedaan sama reducer, reducer hanya berfokus pada tugas dari masing2 action. tapi bisa ada celah di penggunaan nya karena kita ga handle tag
   Semua Logic taro di reducer
  */
  // Home
  return match<[StateType, ActionType], StateType>([prevState, action])
    // Home
    .with([{ home: { tag: "idle" } }, { type: ActionTypeEnum.FETCH_HOME }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        tag: "loading",
        errorMessage: ""
      }
    }))
    .with([{ home: { tag: "loading" } }, { type: ActionTypeEnum.CHANGE_INPUT }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        page: 1,
        inputValue: action.payload.inputValue
      }
    }))
    .with([{ home: { tag: "loading" } }, { type: ActionTypeEnum.FETCH_HOME_SUCCESS }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        products: action.payload.products,
        totalData: action.payload.totalData,
        tag: action.payload.products.length == 0 ? "empty" : "success",
        errorMessage: ""
      }
    }))
    .with([{ home: { tag: "loading" } }, { type: ActionTypeEnum.FETCH_HOME_ERROR }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        errorMessage: action.payload.errorMessage,
        products: [],
        tag: "error",
      }
    }))
    .with([{ home: { tag: "success" } }, { type: ActionTypeEnum.CHANGE_PAGE }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        page: action.payload.page,
        tag: "changing-page"
      }
    }))
    .with([{ home: { tag: "success" } }, { type: ActionTypeEnum.CHANGE_INPUT }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        page: 1,
        tag: "loading",
        inputValue: action.payload.inputValue
      }
    }))
    .with([{ home: { tag: "changing-page" } }, { type: ActionTypeEnum.CHANGE_PAGE_SUCCESS }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        products: action.payload.products,
        tag: "success"
      }
    }))
    .with([{ home: { tag: "changing-page" } }, { type: ActionTypeEnum.CHANGE_PAGE_ERROR }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        products: [],
        errorMessage: action.payload.errorMessage,
        tag: "changing-page-error"
      }
    }))
    .with([{ home: { tag: "empty" } }, { type: ActionTypeEnum.CHANGE_INPUT }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        tag: "loading",
        page: 1,
        inputValue: action.payload.inputValue
      }
    }))
    .with([{ home: { tag: "error" } }, { type: ActionTypeEnum.CHANGE_INPUT }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        tag: "loading",
        page: 1,
        inputValue: action.payload.inputValue
      }
    }))
    .with([{ home: { tag: "error" } }, { type: ActionTypeEnum.REFETCH_HOME }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        tag: "loading"
      }
    }))
    .with([{ home: { tag: "changing-page-error" } }, { type: ActionTypeEnum.RECHANGE_PAGE }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        page: action.payload.page,
        tag: "changing-page"
      }
    }))
    .with([{ home: { tag: "changing-page-error" } }, { type: ActionTypeEnum.CHANGE_INPUT }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        tag: "loading",
        page: 1,
        inputValue: action.payload.inputValue
      }
    }))
    // Favorite
    .with([{ favorite: { tag: "idle" } }, { type: ActionTypeEnum.FETCH_FAVORITE }], ([prevState, action]) =>
    ({
      ...prevState,
      favorite: {
        ...prevState.favorite,
        products: [],
        tag: "loading",
        errorMessage: ""
      }
    }))
    .with([{ favorite: { tag: "loading" } }, { type: ActionTypeEnum.FETCH_FAVORITE_SUCCESS }], ([prevState, action]) =>
    ({
      ...prevState,
      favorite: {
        ...prevState.favorite,
        products: action.payload.products,
        tag: action.payload.products.length == 0 ? "empty" : "success",
        errorMessage: ""
      }
    }))
    .with([{ favorite: { tag: "loading" } }, { type: ActionTypeEnum.FETCH_FAVORITE_ERROR }], ([prevState, action]) =>
    ({
      ...prevState,
      favorite: {
        ...prevState.favorite,
        products: [],
        tag: "error",
        errorMessage: action.payload.errorMessage
      }
    }))
    .with([{ favorite: { tag: "success" } }, { type: ActionTypeEnum.TOGGLE_FAVORITE }], ([prevState, action]) => {
      const isFavorite = prevState.favorite.favoriteIds.some(id => id == action.payload.id)
      const newFavoriteIds = isFavorite ? prevState.favorite.favoriteIds.filter((id) => id != action.payload.id) : [...prevState.favorite.favoriteIds, action.payload.id]
      return {
        ...prevState,
        favorite: {
          ...prevState.favorite,
          products: [],
          favoriteIds: newFavoriteIds,
          tag: "loading",
          errorMessage: ""
        }
      }
    })
    .with([{ favorite: { tag: "error" } }, { type: ActionTypeEnum.REFETCH_FAVORITE }], ([prevState, action]) =>
    ({
      ...prevState,
      favorite: {
        ...prevState.favorite,
        tag: "loading"
      }
    }))
    // Detail
    .with([{ detail: { tag: "idle" } }, { type: ActionTypeEnum.FETCH_DETAIL }], ([prevState, action]) =>
    ({
      ...prevState,
      detail: {
        ...prevState.detail,
        tag: "loading"
      }
    }))
    .with([{ detail: { tag: "loading" } }, { type: ActionTypeEnum.FETCH_DETAIL_SUCCESS }], ([prevState, action]) =>
    ({
      ...prevState,
      detail: {
        ...prevState.detail,
        product: action.payload.product,
        tag: "success",
        errorMessage: ""
      }
    }))
    .with([{ detail: { tag: "loading" } }, { type: ActionTypeEnum.FETCH_DETAIL_ERROR }], ([prevState, action]) =>
    ({
      ...prevState,
      detail: {
        ...prevState.detail,
        product: null,
        tag: "error",
        errorMessage: action.payload.errorMessage
      }
    }))
    .with([{ detail: { tag: "error" } }, { type: ActionTypeEnum.REFETCH_DETAIL }], ([prevState, action]) =>
    ({
      ...prevState,
      detail: {
        ...prevState.detail,
        tag: "loading"
      }
    }))
    // Global Action
    .with([{}, { type: ActionTypeEnum.RESET_HOME }], ([prevState, action]) =>
    ({
      ...prevState,
      home: {
        ...prevState.home,
        tag: "idle",
        page: 1,
        inputValue: "",
        products: [],
        errorMessage: "",
        totalData: 0
      }
    }))
    .with([{}, { type: ActionTypeEnum.RESET_DETAIL }], ([prevState, action]) =>
    ({
      ...prevState,
      detail: {
        ...prevState.detail,
        tag: "idle",
        product: null,
        errorMessage: "",
      }
    }))
    .with([{}, { type: ActionTypeEnum.RESET_FAVORITE }], ([prevState, action]) =>
    ({
      ...prevState,
      favorite: {
        ...prevState.favorite,
        tag: "idle",
        products: [],
        errorMessage: ""
      }
    }))
    .with([{}, { type: ActionTypeEnum.NAVIGATE }], ([prevState, action]) =>
    ({
      ...prevState,
      path: action.payload.path,
      query: action.payload.query
    }))
    .with([{}, { type: ActionTypeEnum.TOGGLE_FAVORITE }], ([prevState, action]) => {
      const isFavorite = prevState.favorite.favoriteIds.some(id => id == action.payload.id)
      const newFavoriteIds = isFavorite ? prevState.favorite.favoriteIds.filter((id) => id != action.payload.id) : [...prevState.favorite.favoriteIds, action.payload.id]
      return {
        ...prevState,
        favorite: {
          ...prevState.favorite,
          favoriteIds: newFavoriteIds
        }
      }
    })
    .otherwise(() => prevState)
}

export const sendAction = (action: ActionType) => {
  const newState = reducer(state, action)
  setState(newState)
}