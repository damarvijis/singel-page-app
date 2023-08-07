import { sendAction, ActionTypeEnum } from "../reducer"

type LinkPropsType = {
  href: string
  label: string
  onClick?: () => void
}

const Link = (props: LinkPropsType) => {
  const link = document.createElement('a')
  link.href = props.href
  link.textContent = props.label
  link.onclick = (event) => {
    event.preventDefault()
    if (event.target instanceof HTMLAnchorElement) {
      const url = new URL(event.target.href)
      sendAction({ type: ActionTypeEnum.NAVIGATE, payload: { path: url.pathname } })
      props.onClick && props.onClick()
    }
  }

  return link
}

export default Link