import React from "react"
import { getTranslations } from "next-intl/server"
import Button from "@/components/ui/Button"
import ToursBoard from "@/app/[locale]/(main)/_components/ToursBoard"

export default async function PopularToursSection() {
  const t = await getTranslations("TourBoard")
  const sT = await getTranslations("Shared")

  return (
    <section className="py-4 md:py-8 px-4 sm:px-16 lg:py-12 lg:px-[120px] flex flex-col bg-colorBgLayout gap-4 lg:gap-8">
      <div className="flex justify-between items-end">
        <h2 className="text-headline4 sm:text-headline2 lg:text-headline1">{t("popularTours")}</h2>
        <Button href="/search" variant="outlined" color="secondary" size="sm" className="text-body2 hidden sm:block">
          {sT("lookThroughAllTours")}
        </Button>
      </div>
      <ToursBoard />
    </section>
  )
}
