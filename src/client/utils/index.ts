import { constData } from "../const/index"

export const skipDataPagination = (page: number) => {
  return (page - 1) * constData.limit
}