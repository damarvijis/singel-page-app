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
  // return match<[StateType, ActionType], StateType>([prevState, action])
  //   .with([{ favorite: { tag: "idle" } }, { type: ActionTypeEnum.FETCH_FAVORITE }], ([prevState, action]) =>
  //   ({
  //     ...prevState, favorite: {
  //       ...prevState.favorite,
  //       products: [],
  //       tag: "loading",
  //       errorMessage: ""
  //     }
  //   }))
  //   .otherwise(() => prevState)
  switch (prevState.home.tag) {
    case "idle":
      switch (action.type) {
        case ActionTypeEnum.FETCH_HOME:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading",
              errorMessage: ""
            }
          }
      }
    case "loading": {
      switch (action.type) {
        case ActionTypeEnum.CHANGE_INPUT:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              page: 1,
              inputValue: action.payload.inputValue
            }
          }
        case ActionTypeEnum.FETCH_HOME_SUCCESS:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              products: action.payload.products,
              totalData: action.payload.totalData,
              tag: action.payload.products.length == 0 ? "empty" : "success",
              errorMessage: ""
            }
          }
        case ActionTypeEnum.FETCH_HOME_ERROR:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              errorMessage: action.payload.errorMessage,
              products: [],
              tag: "error",
            }
          }
      }
    }
    case "success": {
      switch (action.type) {
        case ActionTypeEnum.CHANGE_PAGE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              page: action.payload.page,
              tag: "changing-page"
            }
          }
        case ActionTypeEnum.CHANGE_INPUT:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              page: 1,
              tag: "loading",
              inputValue: action.payload.inputValue
            }
          }
      }
    }
    case "changing-page": {
      switch (action.type) {
        case ActionTypeEnum.CHANGE_PAGE_SUCCESS:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              products: action.payload.products,
              tag: "success"
            }
          }
        case ActionTypeEnum.CHANGE_PAGE_ERROR:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              products: [],
              errorMessage: action.payload.errorMessage,
              tag: "changing-page-error"
            }
          }
      }
    }
    case "empty": {
      switch (action.type) {
        case ActionTypeEnum.CHANGE_INPUT:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading",
              page: 1,
              inputValue: action.payload.inputValue
            }
          }
      }
    }
    case "error": {
      switch (action.type) {
        case ActionTypeEnum.CHANGE_INPUT:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading",
              page: 1,
              inputValue: action.payload.inputValue
            }
          }
        case ActionTypeEnum.REFETCH_HOME:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading"
            }
          }
      }
    }
    case "changing-page-error": {
      switch (action.type) {
        case ActionTypeEnum.CHANGE_INPUT:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading",
              page: 1,
              inputValue: action.payload.inputValue
            }
          }
        case ActionTypeEnum.RECHANGE_PAGE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              page: action.payload.page,
              tag: "changing-page"
            }
          }
      }
    }
  }
  // Favorite
  switch (prevState.favorite.tag) {
    case "idle":
      switch (action.type) {
        case ActionTypeEnum.FETCH_FAVORITE:
          return {
            ...prevState,
            favorite: {
              ...prevState.favorite,
              products: [],
              tag: "loading",
              errorMessage: ""
            }
          }
      }
    case "loading": {
      switch (action.type) {
        case ActionTypeEnum.FETCH_FAVORITE_SUCCESS:
          return {
            ...prevState,
            favorite: {
              ...prevState.favorite,
              products: action.payload.products,
              tag: action.payload.products.length == 0 ? "empty" : "success",
              errorMessage: ""
            }
          }
        case ActionTypeEnum.FETCH_FAVORITE_ERROR:
          return {
            ...prevState,
            favorite: {
              ...prevState.favorite,
              products: [],
              tag: "error",
              errorMessage: action.payload.errorMessage
            }
          }
      }
    }
    case "success": {
      switch (action.type) {
        case ActionTypeEnum.TOGGLE_FAVORITE:
          const isFavorite = prevState.favorite.favoriteIds.some(id => id == action.payload.id)
          const newFavoriteIds = isFavorite ? state.favorite.favoriteIds.filter((id) => id != action.payload.id) : [...state.favorite.favoriteIds, action.payload.id]
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
      }
    }
    case "error": {
      switch (action.type) {
        case ActionTypeEnum.REFETCH_FAVORITE:
          return {
            ...prevState,
            favorite: {
              ...prevState.favorite,
              tag: "loading"
            }
          }
      }
    }
  }
  // Detail
  switch (prevState.detail.tag) {
    case "idle":
      switch (action.type) {
        case ActionTypeEnum.FETCH_DETAIL:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              tag: "loading"
            }
          }
      }
    case "loading": {
      switch (action.type) {
        case ActionTypeEnum.FETCH_DETAIL_SUCCESS:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              product: action.payload.product,
              tag: "success",
              errorMessage: ""
            }
          }
        case ActionTypeEnum.FETCH_DETAIL_ERROR:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              product: null,
              tag: "error",
              errorMessage: action.payload.errorMessage
            }
          }
      }
    }
    case "error": {
      switch (action.type) {
        case ActionTypeEnum.REFETCH_DETAIL:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              tag: "loading"
            }
          }
      }
    }
  }
  // Khusus Global Action
  switch (action.type) {
    // reset screen state
    case ActionTypeEnum.RESET_HOME:
      return {
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
      }
    case ActionTypeEnum.RESET_DETAIL:
      return {
        ...prevState,
        detail: {
          ...prevState.detail,
          tag: "idle",
          product: null,
          errorMessage: "",
        }
      }
    case ActionTypeEnum.RESET_FAVORITE:
      return {
        ...prevState,
        favorite: {
          ...prevState.favorite,
          tag: "idle",
          products: [],
          errorMessage: ""
        }
      }
    case ActionTypeEnum.NAVIGATE:
      return {
        ...prevState,
        path: action.payload.path,
        query: action.payload.query
      }
    case ActionTypeEnum.TOGGLE_FAVORITE:
      const isFavorite = prevState.favorite.favoriteIds.some(id => id == action.payload.id)
      const newFavoriteIds = isFavorite ? state.favorite.favoriteIds.filter((id) => id != action.payload.id) : [...state.favorite.favoriteIds, action.payload.id]
      return {
        ...prevState,
        favorite: {
          ...prevState.favorite,
          favoriteIds: newFavoriteIds
        }
      }
    default:
      return prevState
  }
}

export const sendAction = (action: ActionType) => {
  const newState = reducer(state, action)
  setState(newState)
}