import Link from "./Link"

type NavbarPropsType = {
  onClickHome: (query: Record<string, string>) => void
  onClickFavorite: (query: Record<string, string>) => void
}

const Navbar = (props: NavbarPropsType) => {
  const linkHome = Link({
    href: "/home",
    label: "Home",
    onClick: props.onClickHome,
  })

  const linkFavorite = Link({
    href: "/favorite",
    label: "Favorite",
    onClick: props.onClickFavorite,
  })

  const navbar = document.createElement("div")
  navbar.style.display = "flex"
  navbar.style.gap = "10px"
  navbar.append(linkHome)
  navbar.append(linkFavorite)

  return navbar
}

export default Navbar