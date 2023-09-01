import Link from "./Link"
import { useAppContext } from "../context"

const Navbar = () => {
  const { onSetUrl } = useAppContext()

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Link href={"/home"} label={"Home"} onClick={onSetUrl} />
      <Link href={"/favorite"} label={"Favorite"} onClick={onSetUrl} />
    </div>
  )
}


export default Navbar