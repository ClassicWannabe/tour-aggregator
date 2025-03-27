import { API_PATHS } from "@/lib/consts/api-paths"
import { SupplierProfilePhoto } from "@/lib/interfaces/suppliers"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"

export const uploadSupplierProfilePhoto = async (photo: File): Promise<SupplierProfilePhoto> => {
  const formData = new FormData()
  formData.append("photo", photo)
  const url = makeFetchUrlPath(API_PATHS.uploadSupplierProfilePhoto)
  const response = await fetch(url, { method: "POST", body: formData, credentials: "include" })

  return response.json()
}
