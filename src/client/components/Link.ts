import { sendAction, ActionTypeEnum } from "../reducer"

type LinkPropsType = {
  href: string
  label: string
}

const Link = (props: LinkPropsType) => {
  const link = document.createElement('a')
  link.href = props.href
  link.textContent = props.label
  link.onclick = (event) => {
    event.preventDefault()
    if (event.target instanceof HTMLAnchorElement) {
      const url = new URL(event.target.href)
      const urlParams = new URLSearchParams(url.search.split('?')[1])
      const query: Record<string, string> = {}
      urlParams.forEach((value, key) => {
        query[key] = value
      })

      sendAction({ type: ActionTypeEnum.NAVIGATE, payload: { path: url.pathname, query } })
    }
  }

  return link
}

export default Link