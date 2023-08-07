import { state } from "../state/index"
import { sendAction, ActionTypeEnum } from "../reducer"

const Pagination = () => {
  const div = document.createElement("div")
  div.style.display = "flex"
  div.style.flexDirection = "row"
  div.style.gap = "5px"
  div.style.justifyContent = "center"
  div.style.alignItems = "center"

  const page = []

  for (let i = 1; i <= state.home.totalPage; i++) {
    const button = document.createElement("button")
    if (i == state.home.page) {
      button.style.backgroundColor = "red"
    }
    button.textContent = i.toString()
    button.onclick = () => {
      sendAction({
        type: ActionTypeEnum.CHANGE_PAGE,
        payload: { page: i }
      })
    }
    page.push(button)
  }

  div.append(...page)

  return div
}

export default Pagination