import { API_PATHS } from "@/lib/consts/api-paths"
import { CreateTourData } from "@/actions/create-tour"
import { apiClient } from "@/lib/utils/api-client"

type EditTourData = Partial<CreateTourData>

export const editTour = async (tourId: string, tour: EditTourData) => {
  return apiClient.patch(API_PATHS.tourById(tourId), tour)
}
