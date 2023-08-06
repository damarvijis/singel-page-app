import { state } from "./state/index"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import FavoritePage from "./pages/FavoritePage"
import DetailPage from "./pages/DetailPage"

const App = () => {
  const div = document.createElement("div")
  const navbar = Navbar()
  const homeContent = HomePage()
  const favoriteContent = FavoritePage()
  const detailContent = DetailPage()

  if (!state.path.includes("/detail")) {
    div.append(navbar)
  }

  if (state.path == "/home") {
    div.append(homeContent)
  } else if (state.path == "/favorite") {
    div.append(favoriteContent)
  } else if (state.path.includes("/detail")) {
    div.append(detailContent)
  } else {
    div.append(homeContent)
  }

  return div
}

export default App