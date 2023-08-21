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
  return <FavoriteContent
    {...props}
    send={send}
    state={state}
  />
}

export default FavoritePage