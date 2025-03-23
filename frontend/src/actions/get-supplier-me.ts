import { API_PATHS } from "@/lib/consts/api-paths"
import { Supplier } from "@/lib/interfaces/suppliers"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { fetchWithAuth } from "@/lib/utils/fetch-with-auth"

export const getSupplierMe = async (): Promise<Supplier> => {
  const url = makeFetchUrlPath(API_PATHS.supplierMe)
  const response = await fetchWithAuth(url)

  return response.json()
}
