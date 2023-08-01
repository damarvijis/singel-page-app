import App from "./App.js"
import { onChangeState, state } from "./state/index.js"

export const render = () => {
  const content = document.getElementById('content')
  const focusedElementId = document.activeElement.id
  const focusedElementSelectionStart = document.activeElement.selectionStart
  const focusedElementSelectionEnd = document.activeElement.selectionEnd

  // instantiate element
  const app = App()
  // reset content when re-render
  content.innerHTML = ""
  // render element
  content.append(app)

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId)
    focusedElement.focus()
    focusedElement.selectionStart = focusedElementSelectionStart
    focusedElement.selectionEnd = focusedElementSelectionEnd
  }
}

render()
// konsep useEffect react
onChangeState({
  path: undefined,
  home: {
    inputValue: undefined,
    products: undefined,
    isLoading: undefined,
    errorMessage: undefined,
    page: undefined,
    totalPage: undefined,
    totalData: undefined,
  },
  favorite: {
    favoriteIds: undefined,
    isLoading: undefined,
    products: undefined,
    errorMessage: undefined,
  },
  detail: {
    productId: undefined,
    product: undefined,
    isLoading: undefined,
    errorMessage: undefined,
  }
}, state)