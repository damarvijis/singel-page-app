import { state, StateType } from "./state/index"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import FavoritePage from "./pages/FavoritePage"
import DetailPage from "./pages/DetailPage"
import { match } from "ts-pattern"

const App = () => {
  const div = document.createElement("div")
  const navbar = Navbar()
  const homeContent = HomePage()
  const favoriteContent = FavoritePage()
  const detailContent = DetailPage()

  match<StateType["path"], void>(state.path)
    .with("/home", () => {
      div.append(navbar)
      div.append(homeContent)
    })
    .with("/favorite", () => {
      div.append(navbar)
      div.append(favoriteContent)
    })
    .with("/detail", () => div.append(detailContent))
    .otherwise(() => {
      div.append(navbar)
      div.append(homeContent)
    })

  return div
}

export default App