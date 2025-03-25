import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { Tour } from "@/lib/interfaces/tours"

export const deleteTour = async (tourId: string): Promise<Tour> => {
  const url = makeFetchUrlPath(API_PATHS.deleteTour(tourId))
  const response = await fetch(url, { method: "DELETE", credentials: "include" })

  return response.json()
}
