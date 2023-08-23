import HomeContent from "./content"
import { useHomeReducer } from "./reducer"

type HomePagePropsType = {
  onClickDetail: (query: Record<string, string>) => void
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

const HomePage = (props: HomePagePropsType) => {
  const { state, send } = useHomeReducer()

  return <HomeContent {...props} state={state} send={send} />
}

export default HomePage