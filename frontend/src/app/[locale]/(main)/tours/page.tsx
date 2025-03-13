import React from "react"
import ToursBoard from "@/app/[locale]/(main)/_components/ToursBoard"
import ToursFilterWrapper from "@/app/[locale]/(main)/tours/_components/ToursFilter"
import { SearchParams } from "next/dist/server/request/search-params"
import SearchForm from "@/app/[locale]/(main)/_components/SearchForm"
import { getTranslations } from "next-intl/server"

export default async function CategoryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const t = await getTranslations()
  return (
    <section className="main-layout-padding-horizontal flex gap-4 md:flex-row md:gap-6">
      <ToursFilterWrapper />
      <div className="w-full flex flex-col gap-4 md:gap-6">
        <SearchForm placeHolder={t("Shared.search")} />
        <ToursBoard searchParams={searchParams} />
      </div>
    </section>
  )
}
