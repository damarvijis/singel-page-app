import { setState, state, StateType, HomeType, DetailType, FavoriteType } from "../state";
import { match } from "ts-pattern"

export enum ActionTypeEnum {
  ADD_FAVORITE = "add_favorite",
  NAVIGATE = "navigate",
  // HOME
  FETCH_HOME = "fetch_home",
  RESET_HOME = "reset_home",
  FETCH_HOME_SUCCESS = "fetch_home_success",
  FETCH_HOME_ERROR = "fetch_home_error",
  CHANGE_INPUT = "change_input",
  CHANGE_PAGE = "change_page",
  DEBOUNCE = "debounce",
  GET_TOTAL_PAGE = "get_total_page",
  // DETAIL
  SET_DETAIL = "set_detail",
  FETCH_DETAIL = "fetch_detail",
  FETCH_DETAIL_SUCCESS = "fetch_detail_success",
  FETCH_DETAIL_ERROR = "fetch_detail_error",
  // FAVORITE
  FETCH_FAVORITE = "fetch_favorite",
  FETCH_FAVORITE_SUCCESS = "fetch_favorite_success",
  FETCH_FAVORITE_ERROR = "fetch_favorite_error"
}

type ActionNavigateType = {
  type: ActionTypeEnum.NAVIGATE
  payload: Pick<StateType, "path">
}

type ActionAddFavoriteType = {
  type: ActionTypeEnum.ADD_FAVORITE
  payload: Pick<FavoriteType, "favoriteIds">
}

type ActionFetchHomeType = {
  type: ActionTypeEnum.FETCH_HOME
}

type ActionResetHomeType = {
  type: ActionTypeEnum.RESET_HOME
}

type ActionFetchHomeSuccessType = {
  type: ActionTypeEnum.FETCH_HOME_SUCCESS
  payload: Pick<HomeType, "products" | "totalData">
}

type ActionDebounceType = {
  type: ActionTypeEnum.DEBOUNCE
}

type ActionGetTotalPageType = {
  type: ActionTypeEnum.GET_TOTAL_PAGE
  payload: Pick<HomeType, "totalPage">
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
  type: ActionTypeEnum.SET_DETAIL
  payload: Pick<DetailType, "productId">
}

type ActionFetchDetailType = {
  type: ActionTypeEnum.FETCH_DETAIL
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

type ActionFetchFavoriteSuccessType = {
  type: ActionTypeEnum.FETCH_FAVORITE_SUCCESS
  payload: Pick<FavoriteType, "products">
}

type ActionFetchFavoriteErrorType = {
  type: ActionTypeEnum.FETCH_FAVORITE_ERROR
  payload: Pick<FavoriteType, "errorMessage">
}

type ActionType =
  ActionNavigateType |
  ActionAddFavoriteType |
  ActionGetTotalPageType |
  ActionChangeInputType |
  ActionChangePageType |
  ActionDebounceType |
  ActionResetHomeType |
  ActionFetchHomeType |
  ActionFetchHomeSuccessType |
  ActionFetchHomeErrorType |
  ActionFetchFavoriteType |
  ActionFetchFavoriteSuccessType |
  ActionFetchFavoriteErrorType |
  ActionSetDetailType |
  ActionFetchDetailType |
  ActionFetchDetailSuccessType |
  ActionFetchDetailErrorType

const reducer = (prevState: StateType, action: ActionType): StateType => {
  // return match<[StateType, ActionType], StateType>([prevState,action]).with({ type: ActionTypeEnum.NAVIGATE }, (value) => { ...prevState, path: action.payload.path })
  // Khusus Global Action
  switch (action.type) {
    case ActionTypeEnum.NAVIGATE:
      return {
        ...prevState,
        path: action.payload.path
      }
    case ActionTypeEnum.ADD_FAVORITE:
      return {
        ...prevState,
        favorite: {
          ...prevState.favorite,
          favoriteIds: action.payload.favoriteIds
        }
      }
  }
  /*
   Finite State Machine dibuat per-entity (action dibatasi dari tag) | Dari Interface contoh: idle -> loading -> success. gabisa kaya success -> idle
   Perbedaan sama reducer, reducer hanya berfokus pada tugas dari masing2 action. tapi bisa ada celah di penggunaan nya karena kita ga handle tag
  */
  // Home
  switch (prevState.home.tag) {
    case "idle":
      switch (action.type) {
        case ActionTypeEnum.DEBOUNCE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "debounce",
            }
          }
        case ActionTypeEnum.FETCH_HOME:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading",
              errorMessage: ""
            }
          }
        case ActionTypeEnum.RESET_HOME:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading",
              page: 1,
              inputValue: ""
            }
          }
      }
    case "debounce": {
      switch (action.type) {
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
    }
    case "loading": {
      switch (action.type) {
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
        case ActionTypeEnum.RESET_HOME:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "loading",
              page: 1,
              inputValue: ""
            }
          }
        case ActionTypeEnum.GET_TOTAL_PAGE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              totalPage: action.payload.totalPage
            }
          }
        case ActionTypeEnum.CHANGE_PAGE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              page: action.payload.page,
              tag: "loading"
            }
          }
        case ActionTypeEnum.CHANGE_INPUT:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              page: 1,
              inputValue: action.payload.inputValue
            }
          }
        case ActionTypeEnum.DEBOUNCE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "debounce",
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
              page: 1,
              inputValue: action.payload.inputValue
            }
          }
        case ActionTypeEnum.DEBOUNCE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "debounce",
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
              page: 1,
              inputValue: action.payload.inputValue
            }
          }
        case ActionTypeEnum.DEBOUNCE:
          return {
            ...prevState,
            home: {
              ...prevState.home,
              tag: "debounce",
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
    }
  }
  // Detail
  switch (prevState.detail.tag) {
    case "idle":
      switch (action.type) {
        case ActionTypeEnum.SET_DETAIL:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              productId: action.payload.productId
            }
          }
        case ActionTypeEnum.FETCH_DETAIL:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              product: null,
              tag: "loading",
              errorMessage: ""
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
    case "success": {
      switch (action.type) {
        case ActionTypeEnum.SET_DETAIL:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              productId: action.payload.productId
            }
          }
        case ActionTypeEnum.FETCH_DETAIL:
          return {
            ...prevState,
            detail: {
              ...prevState.detail,
              product: null,
              tag: "loading",
              errorMessage: ""
            }
          }
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

/*
  Kenapa match gabisa? :(
  Perlu ga buat reset all tag -> idle kalo pindah halaman?
  Perlu cek tag di sideEffect?
*/