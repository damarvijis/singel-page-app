import { state } from "./state/index.js"
import Navbar from "./components/Navbar.js"
import HomePage from "./pages/HomePage.js"
import FavoritePage from "./pages/FavoritePage.js"
import DetailPage from "./pages/DetailPage.js"

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