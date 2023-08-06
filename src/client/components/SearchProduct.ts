import { setState, state } from "../state/index"

const SearchProduct = () => {
  const div = document.createElement("div")

  const input = document.createElement("input")
  input.id = "input"
  input.value = state.home.inputValue
  input.placeholder = "enter product name"
  input.oninput = (event) => {
    if (event.target instanceof HTMLInputElement) {
      setState({ home: { ...state.home, inputValue: event.target.value } })
    }
  }

  div.append(input)

  return div
}

export default SearchProduct