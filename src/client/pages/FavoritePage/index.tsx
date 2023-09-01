import FavoriteContent from "./content"
import { useFavoriteReducer } from "./reducer"
import { useAppContext } from "../../context"

const FavoritePage = () => {
  const { favoriteIds, onToggleFavorite } = useAppContext()

  const { state, send } = useFavoriteReducer({
    favoriteIds,
    onToggleFavorite,
  })

  return <FavoriteContent
    send={send}
    state={state}
  />
}

export default FavoritePage