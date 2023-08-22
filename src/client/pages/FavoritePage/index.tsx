import FavoriteContent from "./content"
import { useFavoriteReducer } from "./reducer"
import { AppContext } from "../../context"
import { useContext } from "react"

const FavoritePage = () => {
  const { favoriteIds, onToggleFavorite } = useContext(AppContext)

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