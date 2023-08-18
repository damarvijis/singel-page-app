import { state } from "../state/index"
import { sendAction, ActionTypeEnum } from "../reducer"

const SearchProduct = () => {
  const div = document.createElement("div")

  const input = document.createElement("input")
  input.id = "input"
  input.value = state.home.inputValue
  input.placeholder = "enter product name"
  input.oninput = (event) => {
    if (event.target instanceof HTMLInputElement) {
      sendAction({
        type: ActionTypeEnum.CHANGE_INPUT,
        payload: { inputValue: event.target.value }
      })
    }
  }

  div.append(input)

  return div
}

export default SearchProduct