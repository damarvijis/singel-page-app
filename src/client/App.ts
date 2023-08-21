import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage/index"
import FavoritePage from "./pages/FavoritePage/index"
import DetailPage from "./pages/DetailPage/index"
import { match } from "ts-pattern"
import { React } from "./React"

const App = () => {
  const favoriteIds = localStorage.getItem("favoriteIds")
  const [favIds, setFavIds] = React.useState<number[]>(favoriteIds ? JSON.parse(favoriteIds) : [])
  const [url, setUrl] = React.useState<{ path: string, query: Record<string, string> }>({
    path: window.location.pathname,
    query: {}
  })

  const toggleFavoriteIds = (tagetId: number) => {
    const isFavorite = favIds.some(id => id == tagetId)
    const newFavoriteIds = isFavorite ? favIds.filter((id) => id != tagetId) : [...favIds, tagetId]
    setFavIds(newFavoriteIds)
  }
  const onClickHome = (query: Record<string, string>) => setUrl({ path: "/home", query })
  const onClickFavorite = (query: Record<string, string>) => setUrl({ path: "/favorite", query })
  const onClickDetail = (query: Record<string, string>) => setUrl({ path: "/detail", query })

  const div = document.createElement("div")
  const navbar = Navbar({
    onClickHome,
    onClickFavorite
  })

  const homeContent = HomePage({
    onClickDetail,
    favoriteIds: favIds,
    onToggleFavorite: toggleFavoriteIds,
    path: url.path,
  })

  const favoriteContent = FavoritePage({
    onClickDetail,
    favoriteIds: favIds,
    onToggleFavorite: toggleFavoriteIds,
    path: url.path,
  })

  const detailContent = DetailPage({
    onClickHome,
    path: url.path,
    query: url.query,
  })

  React.useEffect(() => {
    const windowUrl = new URL(window.location.href)
    windowUrl.pathname = url.path
    if (Object.keys(url.query).length == 0) {
      windowUrl.search = ''
    } else {
      const params = new URLSearchParams()
      Object.keys(url.query).forEach((key) => params.set(key, url.query[key]))
      windowUrl.search = params.toString()
    }
    window.history.pushState(null, "", windowUrl.toString())
  }, [url])

  React.useEffect(() => {
    localStorage.setItem("favoriteIds", JSON.stringify(favIds))
  }, [favIds])

  match(url.path)
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