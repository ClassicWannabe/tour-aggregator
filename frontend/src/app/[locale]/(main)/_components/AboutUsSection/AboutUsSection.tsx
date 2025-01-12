import React from "react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

export default async function AboutUsSection() {
  const t = await getTranslations("AboutUs")
  return (
    <section className="py-4 md:py-8 main-layout-padding-horizontal flex flex-col gap-6 md:gap-8 text-secondaryBlack">
      <h2 className="text-headline4 sm:text-headline2 lg:text-headline1">{t("aboutUs")}</h2>
      <div className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-headline4 md:text-headline3">{t("ourMission")}</h3>
        <p className="text-body1 md:text-xl">{t("missionDesc")}</p>
      </div>
      <h2 className="text-headline4 md:text-headline3">{t("weOffer")}</h2>
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 md:flex-1">
          <span className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12">
            <Image src="/static/icons/about-us-map.svg" fill alt="map icon" />
          </span>
          <p className="text-headline5 md:text-headline3">{t("toursFromAuthors")}</p>
          <p className="text-body2 md:text-body1">{t("fromAuthorsDesc")}</p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 md:flex-1">
          <span className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12">
            <Image src="/static/icons/about-us-backpack.svg" fill alt="map icon" />
          </span>
          <p className="text-headline5 md:text-headline3">{t("directionsDiversity")}</p>
          <p className="text-body2 md:text-body1">{t("directionsDesc")}</p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 md:flex-1">
          <span className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12">
            <Image src="/static/icons/about-us-clock.svg" fill alt="map icon" />
          </span>
          <p className="text-headline5 md:text-headline3">{t("convenientSearch")}</p>
          <p className="text-body2 md:text-body1">{t("searchDesc")}</p>
        </div>
      </div>
    </section>
  )
}
