import React from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import CurrencyText from "@/components/CurrencyText"
import { getLocale, getTranslations } from "next-intl/server"
import { Tour } from "@/lib/interfaces/tours"
import RouteNames from "@/lib/consts/route-names"
import TourCardDates from "@/app/[locale]/(main)/_components/TourCardDates"

interface Props {
  tour: Tour
}

export default async function TourCard({ tour }: Props) {
  const t = await getTranslations("Shared")
  const locale = await getLocale()

  return (
    <Link href={`${RouteNames.Category}/${tour.id}`} className="self-stretch">
      <div className="h-full flex flex-col gap-2 rounded-[9px] bg-primaryWhite min-w-[340px] w-[340px] overflow-hidden border border-borderColorSecondary">
        {!!tour?.photos[0]?.compressedPreviewStorageLink ? (
          <Image
            src={tour.photos[0].compressedPreviewStorageLink}
            height={180}
            width={340}
            loading="lazy"
            alt="tour card"
            className="w-[340px] h-[180px] object-cover"
          />
        ) : (
          <span className="w-[340px] h-[180px] bg-primaryWhite" />
        )}
        <div className="flex flex-col gap-1 px-2 py-1 flex-1">
          <p className="text-body2 text-tertiaryBlack mb-1">{t(`tourType.${tour.type}`)}</p>
          <h4 className="text-headline5 text-secondaryBlack line-clamp-2">{tour.title}</h4>
          <p className="text-body2 text-secondaryBlack line-clamp-3 mt-auto">{tour.description}</p>
          <TourCardDates dates={tour.dates} locale={locale} />
          <div className="flex gap-2 items-center">
            <CurrencyText amount={tour.pricePerPerson} /> <p>{t("perPerson")}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
