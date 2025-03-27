"use server"

import { Tour } from "@/lib/interfaces/tours"
import { SearchParams } from "next/dist/server/request/search-params"
import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import getQueryFromSearchParams from "@/lib/utils/get-query-from-search-params"
import formatSearchParamsForTours from "@/lib/utils/format-search-params-for-tours"

export default async function getTours(searchParams: SearchParams): Promise<Tour[] | []> {
  const formatedSearchParams = formatSearchParamsForTours(searchParams)
  const queryString = getQueryFromSearchParams(formatedSearchParams)
  const data = await fetch(makeFetchUrlPath(`${API_PATHS.tours}?${queryString}`), {
    next: { revalidate: 300 },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!data.ok) {
    return []
  }

  return data.json()
}
