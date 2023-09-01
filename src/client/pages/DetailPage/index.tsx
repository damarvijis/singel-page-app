import DetailContent from "./content"
import { useDetailReducer } from "./reducer"
import { useAppContext } from "../../context"


const DetailPage = () => {
  const { url, onSetUrl } = useAppContext()

  const { state, send } = useDetailReducer({ query: url.query })
  return <DetailContent
    onSetUrl={onSetUrl}
    state={state}
    send={send}
  />
}

export default DetailPage