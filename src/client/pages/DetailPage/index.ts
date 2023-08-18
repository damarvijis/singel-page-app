import DetailContent from "./content"
import { useDetailReducer } from "./reducer"

type DetailPagePropsType = {
  onClickHome: (query: Record<string, string>) => void
  path: string
  query: Record<string, string>
}

const DetailPage = (props: DetailPagePropsType) => {
  const { state, send } = useDetailReducer(props)
  const content = DetailContent({
    ...props,
    send,
    state
  })

  return content
}

export default DetailPage