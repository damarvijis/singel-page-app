import { state, setState } from "../state/index.js"

const Pagination = () => {
  const div = document.createElement("div")
  div.style.display = "flex"
  div.style.flexDirection = "row"
  div.style.gap = "5px"
  div.style.justifyContent = "center"
  div.style.alignItems = "center"

  const page = []
  
  for(let i = 1; i <= state.home.totalPage; i++) {
    const button = document.createElement("button")
    if (i == state.home.page) {
      button.style.backgroundColor = "red"
    }
    button.textContent = i
    button.onclick = () => {
      setState({ home: { ...state.home, page: i, isLoading: true }})
    }
    page.push(button)
  }

  div.append(...page)

  return div
}

export default Pagination