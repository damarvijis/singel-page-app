import DetailContent from "./content"
import { useDetailReducer } from "./reducer"
import { AppContext } from "../../context"
import { useContext } from "react"


const DetailPage = () => {
  const { query, onClickHome } = useContext(AppContext)

  const { state, send } = useDetailReducer({ query })
  return <DetailContent
    onClickHome={onClickHome}
    state={state}
    send={send}
  />
}

export default DetailPage