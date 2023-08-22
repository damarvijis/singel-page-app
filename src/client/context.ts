import { createContext } from "react"

type AppContextType = {
  favoriteIds: number[]
  onToggleFavorite: (tagetId: number) => void
  path: string
  query: Record<string, string>
  onClickHome: (query: Record<string, string>) => void
  onClickFavorite: (query: Record<string, string>) => void
  onClickDetail: (query: Record<string, string>) => void
}

export const AppContext = createContext<AppContextType>({
  favoriteIds: [],
  path: "",
  query: {},
  onToggleFavorite: (targetId) => targetId,
  onClickFavorite: (query) => query,
  onClickHome: (query) => query,
  onClickDetail: (query) => query
})