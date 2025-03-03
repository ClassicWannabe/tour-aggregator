import React from "react"
import ToursBoard from "@/app/[locale]/(main)/_components/ToursBoard"
import ToursFilterWrapper from "@/app/[locale]/(main)/tours/_components/ToursFilter"
import { SearchParams } from "next/dist/server/request/search-params"

export default async function CategoryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <section className="main-layout-padding-horizontal flex flex-col gap-4 md:flex-row md:gap-6">
      <ToursFilterWrapper />
      <ToursBoard searchParams={searchParams} />
    </section>
  )
}
