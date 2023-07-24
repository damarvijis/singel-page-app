import { setState } from "../state/index.js"

const Link = (props) => {
  const link = document.createElement('a')
  link.href = props.href
  link.textContent = props.label
  link.onclick = (event) => {
    event.preventDefault()
    const url = new URL(event.target.href)
    setState({ path: url.pathname })
    props.onClick && props.onClick()
  }

    return link
}

export default Link