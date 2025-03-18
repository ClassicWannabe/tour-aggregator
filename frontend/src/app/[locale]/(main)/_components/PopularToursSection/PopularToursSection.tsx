import React from "react"
import { getTranslations } from "next-intl/server"
import Button from "@/components/ui/Button"
import ToursBoard from "@/app/[locale]/(main)/_components/ToursBoard"
import RouteNames from "@/lib/consts/route-names"
import { SearchParams } from "next/dist/server/request/search-params"

export default async function PopularToursSection({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const t = await getTranslations()

  return (
    <section className="py-4 md:py-8 main-layout-padding-horizontal flex flex-col bg-colorBgLayout gap-4 lg:gap-8">
      <div className="flex justify-between items-end">
        <h2 className="text-headline4 sm:text-headline2 lg:text-headline1">{t("TourBoard.popularTours")}</h2>
        <Button
          href={RouteNames.Category}
          variant="outlined"
          color="secondary"
          size="md"
          className="text-body2 hidden sm:block"
        >
          {t("Shared.lookThroughAllTours")}
        </Button>
      </div>
      <ToursBoard searchParams={searchParams} />
    </section>
  )
}
