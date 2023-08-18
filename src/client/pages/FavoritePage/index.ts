import FavoriteContent from "./content"
import { useFavoriteReducer } from "./reducer"

type FavoritePagePropsType = {
  onClickDetail: (query: Record<string, string>) => void
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
  path: string
}

const FavoritePage = (props: FavoritePagePropsType) => {
  const { state, send } = useFavoriteReducer(props)
  const content = FavoriteContent({
    ...props,
    send,
    state
  })

  return content
}

export default FavoritePage