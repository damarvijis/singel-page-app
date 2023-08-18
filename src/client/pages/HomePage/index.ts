import HomeContent from "./content"
import { useHomeReducer } from "./reducer"

type HomePagePropsType = {
  onClickDetail: (query: Record<string, string>) => void
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
  path: string
}

const HomePage = (props: HomePagePropsType) => {
  const { state, send } = useHomeReducer(props)
  const content = HomeContent({
    ...props,
    send,
    state
  })

  return content
}

export default HomePage