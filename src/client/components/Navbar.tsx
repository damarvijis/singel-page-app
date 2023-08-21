import Link from "./Link"

type NavbarPropsType = {
  onClickHome: (query: Record<string, string>) => void
  onClickFavorite: (query: Record<string, string>) => void
}

const Navbar = (props: NavbarPropsType) => (
  <div style={{ display: "flex", gap: "10px" }}>
    <Link href={"/home"} label={"Home"} onClick={props.onClickHome} />
    <Link href={"/favorite"} label={"Favorite"} onClick={props.onClickFavorite} />
  </div>
)


export default Navbar