type LinkPropsType = {
  href: string
  label: string
  onClick: (query: Record<string, string>) => void
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
      props.onClick(query)
    }
  }

  return link
}

export default Link