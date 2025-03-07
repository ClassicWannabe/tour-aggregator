import { SearchParams } from "next/dist/server/request/search-params"

export default function formatSearchParamsForTours(searchParams?: SearchParams) {
  const searchParamsCopy = { ...searchParams }
  const type = searchParamsCopy?.type
  const locationId = searchParamsCopy?.locationId
  if (type === "ALL") {
    delete searchParamsCopy["type"]
  }
  if (locationId === "ALL") {
    delete searchParamsCopy["locationId"]
  }
  return searchParamsCopy
}
