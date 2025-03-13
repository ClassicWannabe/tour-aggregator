import React from "react"
import TourCard from "@/app/[locale]/(main)/_components/TourCard"
import { SearchParams } from "next/dist/server/request/search-params"
import getTours from "@/actions/get-tours"

export default async function ToursBoard({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchParamsObj = await searchParams

  const tours = await getTours(searchParamsObj)

  return (
    <section className="grid gap-4 justify-center md:gap-8 xl:gap-12 grid-cols-[repeat(auto-fit,_340px)]">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </section>
  )
}
