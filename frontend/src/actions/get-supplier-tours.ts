import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { fetchWithAuth } from "@/lib/utils/fetch-with-auth"
import { SupplierTourResponse, TourStatus } from "@/lib/interfaces/tours"
import getQueryFromSearchParams from "@/lib/utils/get-query-from-search-params"

type GetSupplierTourParams = {
  limit?: number
  offset?: number
  status?: TourStatus
}

export const getSupplierTours = async (params: GetSupplierTourParams = {}): Promise<SupplierTourResponse> => {
  const url = makeFetchUrlPath(API_PATHS.supplierTours)
  const searchParams = getQueryFromSearchParams({
    ...params,
    offset: params.offset?.toString(),
    limit: params.limit?.toString(),
  })
  const response = await fetchWithAuth(url + "?" + searchParams)

  return response.json()
}
