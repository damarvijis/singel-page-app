import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage/index"
import FavoritePage from "./pages/FavoritePage/index"
import DetailPage from "./pages/DetailPage/index"
import { match } from "ts-pattern"
import { useState, useEffect } from "react"

const App = () => {
  const favoriteIds = localStorage.getItem("favoriteIds")
  const [favIds, setFavIds] = useState<number[]>(favoriteIds ? JSON.parse(favoriteIds) : [])
  const [url, setUrl] = useState<{ path: string, query: Record<string, string> }>({
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

  useEffect(() => {
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

  useEffect(() => {
    localStorage.setItem("favoriteIds", JSON.stringify(favIds))
  }, [favIds])

  return (
    <div>
      {
        match(url.path)
          .with("/home", () =>
            <>
              <Navbar onClickHome={onClickHome} onClickFavorite={onClickFavorite} />
              <HomePage
                path={url.path}
                onToggleFavorite={toggleFavoriteIds}
                favoriteIds={favIds}
                onClickDetail={onClickDetail}
              />
            </>
          )
          .with("/favorite", () =>
            <>
              <Navbar onClickHome={onClickHome} onClickFavorite={onClickFavorite} />
              <FavoritePage
                path={url.path}
                onToggleFavorite={toggleFavoriteIds}
                onClickDetail={onClickDetail}
                favoriteIds={favIds}
              />
            </>
          )
          .with("/detail", () =>
            <>
              <DetailPage
                onClickHome={onClickHome}
                path={url.path}
                query={url.query}
              />
            </>
          )
          .otherwise(() =>
            <>
              <Navbar onClickHome={onClickHome} onClickFavorite={onClickFavorite} />
              <HomePage
                path={url.path}
                onToggleFavorite={toggleFavoriteIds}
                favoriteIds={favIds}
                onClickDetail={onClickDetail}
              />
            </>
          )
      }
    </div>
  )
}

export default App