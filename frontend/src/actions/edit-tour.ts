import { API_PATHS } from "@/lib/consts/api-paths"
import { CreateTourData } from "@/actions/create-tour"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"

type EditTourData = Partial<CreateTourData>

export const editTour = async (tourId: string, tour: EditTourData) => {
  const url = makeFetchUrlPath(API_PATHS.tourById(tourId))

  return fetch(url, { method: "PATCH", credentials: "include", body: JSON.stringify(tour) })
}
