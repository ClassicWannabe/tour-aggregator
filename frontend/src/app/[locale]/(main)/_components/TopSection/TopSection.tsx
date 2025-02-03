import React from "react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import FilterTabs from "../FilterTabs"
import SearchForm from "../SearchForm"
import RouteNames from "@/lib/consts/route-names"

export default async function TopSection() {
  const t = await getTranslations()

  return (
    <section className="relative w-full h-[464px] md:h-[600px] flex flex-col justify-center">
      <div className="absolute top-0 left-0 h-full w-full z-[-2]">
        <Image
          src="/static/images/top-section-bg.jpeg"
          alt="Dead lake image"
          fill
          className="object-cover"
          priority={false}
        />
        <div className="w-full h-full bg-[#000000A6] absolute" />
      </div>
      <div className="flex flex-col gap-4 px-8 sm:px-16 md:px-24 lg:px-48 xl:px-[240px] mt-auto">
        <h1 className="text-headline3 md:text-headline1 text-primaryWhite">
          {t.rich("TopSection.motto", {
            company: (chunks) => <span className="text-headline3 md:text-headline1 text-primaryGreen">{chunks}</span>,
          })}
        </h1>
        <SearchForm />
      </div>
      <Link
        href={RouteNames.Category}
        className="block text-body1 text-primaryWhite mt-4 md:text-right px-8 sm:px-16 md:px-24 lg:px-48 xl:px-[240px]"
      >
        {t("Shared.lookThroughAllTours")}
      </Link>
      <FilterTabs />
    </section>
  )
}
