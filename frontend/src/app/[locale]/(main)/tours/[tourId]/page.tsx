import React from "react"
import getTour from "@/actions/get-tour"
import { Params } from "next/dist/server/request/params"
import Badge from "@/components/ui/Badge"
import { getTranslations } from "next-intl/server"
import TourGallery from "./_components/TourGallery/TourGallery"
import TourContactInfo from "./_components/TourContactInfo/TourContactInfo"

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
      <div className="flex flex-row gap-2 md:flex-row md:gap-4">
        <div className="flex-1">
          <TourGallery images={tour.photos} />
        </div>
        <TourContactInfo />
      </div>
    </section>
  )
}
