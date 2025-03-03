import { SearchParams } from "next/dist/server/request/search-params"

export default function getQueryFromSearchParams(searchParams: SearchParams) {
  return new URLSearchParams(
    Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => acc.append(key, v))
      } else if (value !== undefined) {
        acc.append(key, value)
      }
      return acc
    }, new URLSearchParams()),
  ).toString()
}
