type SearchProductType = {
  onInput: (inputValue: string) => void
  inputValue: string
}

const SearchProduct = (props: SearchProductType) => {
  const div = document.createElement("div")

  const input = document.createElement("input")
  input.id = "input"
  input.value = props.inputValue
  input.placeholder = "enter product name"
  input.oninput = (event) => {
    if (event.target instanceof HTMLInputElement) {
      props.onInput(event.target.value)
    }
  }

  div.append(input)

  return div
}

export default SearchProduct