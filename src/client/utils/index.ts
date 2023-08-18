import { constData } from "../internal/const/index"

export const skipDataPagination = (page: number) => {
  return (page - 1) * constData.limit
}