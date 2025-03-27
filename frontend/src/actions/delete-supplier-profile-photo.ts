import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"

export const deleteSupplierProfilePhoto = async (photoId: string): Promise<{ id: string }> => {
  const url = makeFetchUrlPath(API_PATHS.deleteSupplierProfilePhoto(photoId))
  const response = await fetch(url, { method: "DELETE", credentials: "include" })

  return response.json()
}
