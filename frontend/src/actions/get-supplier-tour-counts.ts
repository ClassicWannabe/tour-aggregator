import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { fetchWithAuth } from "@/lib/utils/fetch-with-auth"
import { SupplierTourCounts } from "@/lib/interfaces/tours"

export const getSupplierTourCounts = async (): Promise<SupplierTourCounts> => {
  const url = makeFetchUrlPath(API_PATHS.supplierTourCounts)
  const response = await fetchWithAuth(url)

  return response.json()
}
