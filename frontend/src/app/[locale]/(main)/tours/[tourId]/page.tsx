import React from "react"
import { Params } from "next/dist/server/request/params"
import Badge from "@/components/ui/Badge"
import { getTranslations } from "next-intl/server"
import TourGallery from "./_components/TourGallery/TourGallery"
import getTour from "@/actions/get-tour"
import TourContactInfo from "./_components/TourContactInfo"
import TourProgram from "./_components/TourProgram/TourProgram"
import CustomDayPicker from "@/components/CustomDayPicker"

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { tourId } = await params
  const tour = await getTour(tourId as string)
  const t = await getTranslations()

  return (
    <section className="main-layout-padding-horizontal flex flex-col gap-4 pb-4 md:gap-6 md:pb-12">
      <article className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-headline4 md:text-headline3 text-primaryBlack">{tour.title}</h1>
          <Badge variant="secondary" text={t(`Shared.tourType.${tour.type}`)} className="hidden md:block" />
        </div>
        <p className="text-body2 text-primaryBlack">{tour.thesis}</p>
      </article>
      <div className="flex flex-col gap-3 md:gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-3 md:gap-4">
          <TourGallery images={tour.photos} />
          <article className="flex flex-col gap-2">
            <h2 className="text-headline4 text-primaryBlack">{t("TourDetails.description")}</h2>
            <p className="text-body2 text-primaryBlack">{tour.description}</p>
          </article>
          <TourProgram program={tour.program} />
        </div>
        <div className="flex min-w-[320px] flex-col gap-3 md:flex-row md:justify-center md:gap-4 lg:flex-col lg:justify-start">
          <TourContactInfo tour={tour} />
          <CustomDayPicker dates={tour.dates} />
        </div>
      </div>
    </section>
  )
}
