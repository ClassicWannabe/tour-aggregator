import { apiClient } from "@/lib/utils/api-client"
import { API_PATHS } from "@/lib/consts/api-paths"

type TourProgramItem = {
  time: string
  description: string
}

type CreateTourData = {
  title: string
  thesis: string
  description: string
  type: string
  isTransportIncluded: boolean
  inclusions: string[]
  exclusions: string[]
  pricePerPerson: number
  locationId: string
  peopleCount: number
  startDate: string
  endDate: string
  photoIds: string[]
  program: TourProgramItem[][]
  recurrenceDates: string[]
}

export const createTour = async (tour: CreateTourData) => {
  return apiClient.post(API_PATHS.tours, tour)
}
