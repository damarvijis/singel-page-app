import DetailContent from "./content"
import { useDetailReducer } from "./reducer"

type DetailPagePropsType = {
  onClickHome: (query: Record<string, string>) => void
  query: Record<string, string>
}

const DetailPage = (props: DetailPagePropsType) => {
  const { state, send } = useDetailReducer(props)
  return <DetailContent
    {...props}
    state={state}
    send={send}
  />
}

export default DetailPage