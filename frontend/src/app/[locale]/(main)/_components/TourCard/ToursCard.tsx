import React from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import CurrencyText from "@/components/CurrencyText"
import { getLocale, getTranslations } from "next-intl/server"
import Badge from "@/components/ui/Badge"
import { formatDateToCustomString } from "@/lib/utils/common"
import { Tour } from "@/lib/interfaces/tours";

interface Props {
  tour: Tour
}

export default async function TourCard({ tour }: Props) {
  const t = await getTranslations("Shared")
  const locale = await getLocale()

  return (
    <Link href={`details/${tour.id}`} className="self-stretch">
      <div className="h-full flex flex-col gap-2 rounded-[9px] bg-primaryWhite min-w-[340px] w-[340px] overflow-hidden">
        <Image
          src={tour.photos[0]}
          height={180}
          width={340}
          loading="lazy"
          style={{ objectFit: "cover" }}
          alt="Tours Main Picture"
        />
        <div className="flex flex-col gap-1 px-2 py-1 flex-1">
          <p className="text-body2 text-tertiaryBlack mb-1">Выездной тур</p>
          <h4 className="text-headline5 text-secondaryBlack line-clamp-2">{tour.title}</h4>
          <p className="text-body2 text-secondaryBlack line-clamp-3 mt-auto">{tour.description}</p>
          <div className="flex gap-1 items-center">
            <Badge text={formatDateToCustomString(tour.startDate, locale)} />
            <Badge text={formatDateToCustomString(tour.endDate, locale)} />
          </div>
          <div className="flex gap-2 items-center">
            <CurrencyText amount={tour.pricePerPerson} /> <p>{t("perPerson")}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
