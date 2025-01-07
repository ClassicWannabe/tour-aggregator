import React from "react"
import { getTranslations } from "next-intl/server"

export default async function AboutUsSection() {
  const t = await getTranslations("AboutUs")
  return (
    <section className="py-4 md:py-8 px-4 sm:px-16 md:px-[60px] lg:px-[120px] flex flex-col gap-6 md:gap-8 text-secondaryBlack">
      <h2 className="text-headline4 sm:text-headline2 lg:text-headline1">{t("aboutUs")}</h2>
      <div className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-headline4 md:text-headline3">{t("ourMission")}</h3>
        <p className="text-body1 md:text-xl">{t("missionDesc")}</p>
      </div>
      <h2 className="text-headline4 sm:text-headline2 lg:text-headline1">{t("weOffer")}</h2>
      <div className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-headline4 md:text-headline3">{t("ourMission")}</h3>
        <p className="text-body1 md:text-xl">{t("missionDesc")}</p>
      </div>
    </section>
  )
}
