// @ts-nocheck
import App from "./App"
import { onChangeState, state, StateType } from "./state/index"

export const render = () => {
  const content = document.getElementById('content')
  const focusedElementId = document?.activeElement?.id

  if (content) {
    let focusedElementSelectionStart: number | null = null
    let focusedElementSelectionEnd: number | null = null

    if (document.activeElement instanceof HTMLInputElement) {
      focusedElementSelectionStart = document.activeElement.selectionStart
      focusedElementSelectionEnd = document.activeElement.selectionEnd
    }

    const app = App()
    content.innerHTML = ""
    content.append(app)

    if (focusedElementId) {
      const targetElement = document.getElementById(focusedElementId)
      if (targetElement instanceof HTMLInputElement) {
        targetElement.focus();
        targetElement.setSelectionRange(focusedElementSelectionStart, focusedElementSelectionEnd);
      }
    }

  }
}

render()
// onChangeState({} as StateType, state) // curang
// konsep useEffect react
onChangeState({
  path: undefined,
  query: undefined,
  home: {
    inputValue: undefined,
    products: undefined,
    tag: undefined,
    errorMessage: undefined,
    page: undefined,
    totalPage: undefined,
    totalData: undefined,
  },
  favorite: {
    favoriteIds: undefined,
    tag: undefined,
    products: undefined,
    errorMessage: undefined,
  },
  detail: {
    product: undefined,
    tag: undefined,
    errorMessage: undefined,
  }
}, state)