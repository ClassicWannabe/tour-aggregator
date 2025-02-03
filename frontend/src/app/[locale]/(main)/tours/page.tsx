import ToursFilter from "@/app/[locale]/(main)/tours/_components/ToursFilter/ToursFilter"
import ToursBoard from "@/app/[locale]/(main)/_components/ToursBoard"
import React from "react"

interface SearchParams {
  locale: string
}

export default async function CategoryPage({ params }: { params: Promise<SearchParams> }) {
  return (
    <section className="main-layout-padding-horizontal flex flex-col gap-4 md:flex-row md:gap-6">
      <ToursFilter />
      <ToursBoard />
    </section>
  )
}
