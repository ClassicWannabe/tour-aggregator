import { apiClient } from "@/lib/utils/api-client"
import { API_PATHS } from "@/lib/consts/api-paths"

export type Location = {
  id: string
  name: string
}

export const fetchLocations = async () => {
  return apiClient.get<Location[]>(API_PATHS.locations)
}
