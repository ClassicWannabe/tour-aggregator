import ToursFilter from "./ToursFilter"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { API_PATHS } from "@/lib/consts/api-paths"
import { TourFilters } from "@/lib/interfaces/tours"
import { Suspense } from "react"

async function getFilters() {
  const res = await fetch(makeFetchUrlPath(API_PATHS.filters), {
    cache: "force-cache",
  })
  const filters: TourFilters = await res.json()
  if (!filters) return null
  return filters
}

export default async function ToursFilterWrapper() {
  const filters = await getFilters()
  return (
    <aside>
      <Suspense fallback={<p>Гружусь</p>}>
        <ToursFilter filters={filters} />
      </Suspense>
    </aside>
  )
}
