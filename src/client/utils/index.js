import { constData } from "../const/index.js"

export const skipDataPagination = (page) => {
  return (page - 1) * constData.limit
}