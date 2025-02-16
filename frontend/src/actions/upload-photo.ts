import { apiClient } from "@/lib/utils/api-client"
import { API_PATHS } from "@/lib/consts/api-paths"

export type Photo = {
  id: string
  originalStorageLink: string
  compressedMediumStorageLink: string
  compressedPreviewStorageLink: string
}

export const uploadPhoto = async (photo: File) => {
  const formData = new FormData()
  formData.append("photo", photo)

  return apiClient.post<Photo>(API_PATHS.tourPhotos, formData)
}
