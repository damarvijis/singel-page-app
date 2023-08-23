import { createContext, useState, useEffect, ReactNode, useContext } from "react"

type URLType = {
  path: string
  query: Record<string, string>
}

type AppContextType = {
  favoriteIds: number[]
  onToggleFavorite: (tagetId: number) => void
  url: URLType
  onSetUrl: (path: string, query: Record<string, string>) => void
}

export const AppContext = createContext<AppContextType>({
  favoriteIds: [],
  onToggleFavorite: (targetId) => targetId,
  url: {
    path: "",
    query: {}
  },
  onSetUrl: (path, query) => ({ path, query })
})

export const useAppContext = () => useContext(AppContext)

type RoutePropsType = {
  children: ReactNode
  path: string
}

export const Route = (props: RoutePropsType) => {
  const { url } = useAppContext()

  if (url.path === props.path) return <>{props.children}</>
  return null
}

// type AppProviderPropsType = {
//   children: (appCtx: AppContextType) => ReactNode
// }

type AppProviderPropsType = {
  children: ReactNode
}

export const AppProvider = (props: AppProviderPropsType) => {
  const favoriteIds = localStorage.getItem("favoriteIds")
  const [favIds, setFavIds] = useState<number[]>(favoriteIds ? JSON.parse(favoriteIds) : [])
  const [url, setUrl] = useState<{ path: string, query: Record<string, string> }>({
    path: window.location.pathname,
    query: {}
  })

  const onToggleFavorite = (tagetId: number) => {
    const isFavorite = favIds.some(id => id == tagetId)
    const newFavoriteIds = isFavorite ? favIds.filter((id) => id != tagetId) : [...favIds, tagetId]
    setFavIds(newFavoriteIds)
  }

  const onSetUrl = (path: string, query: Record<string, string>) => setUrl({ path, query })

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
    <AppContext.Provider
      value={{
        favoriteIds: favIds,
        url,
        onToggleFavorite,
        onSetUrl
      }}
    >
      {props.children}
      {/* {props.children({
        favoriteIds: favIds,
        url,
        onToggleFavorite,
        onSetUrl
      })} */}
    </AppContext.Provider>
  )
}