import Link from "./Link"

const Navbar = () => {
  const linkHome = Link({ href: "/home", label: "Home" })
  const linkFavorite = Link({ href: "/favorite", label: "Favorite" })

  const navbar = document.createElement("div")
  navbar.style.display = "flex"
  navbar.style.gap = "10px"
  navbar.append(linkHome)
  navbar.append(linkFavorite)

  return navbar
}

export default Navbar