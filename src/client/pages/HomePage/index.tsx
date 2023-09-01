import HomeContent from "./content"
import { useHomeReducer } from "./reducer"

const HomePage = () => {
  const { state, send } = useHomeReducer()

  return <HomeContent state={state} send={send} />
}

export default HomePage