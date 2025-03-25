import React from "react"
import { Tour } from "@/lib/interfaces/tours"
import { getTranslations } from "next-intl/server"
import getHours from "@/lib/utils/get-hours"
import Image from "next/image"
import CurrencyText from "@/components/CurrencyText"
import TourContactModal from "@/app/[locale]/(main)/tours/[tourId]/_components/TourContactModal"

type Props = {
  tour: Tour
}

const TourContactInfo: React.FC<Props> = async ({ tour }) => {
  const t = await getTranslations()
  return (
    <article className="flex h-fit min-w-80 flex-col gap-4 rounded-lg bg-yellowAccent p-4">
      <h3 className="text-headline5 text-primaryBlack">{t(`Shared.tourType.${tour.type}`)}</h3>
      <p className="text-body2">
        {t("TourDetails.beginning")} - <b>{getHours(tour.dates[0].startDate)}</b>
      </p>
      <h3 className="text-headline5 text-primaryBlack">{t(`TourDetails.whatsIn`)}</h3>
      <div className="flex flex-col gap-4">
        {tour.inclusions.map((inclusion) => (
          <div className="flex items-center gap-2" key={inclusion}>
            <Image src="/static/icons/check-circle.svg" width={16} height={16} alt="check circle" />
            <p className="text-body2">{inclusion}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {tour.exclusions.map((exclusion) => (
          <div className="flex items-center gap-2" key={exclusion}>
            <Image src="/static/icons/x-icon.svg" width={16} height={16} alt="check circle" />
            <p className="text-body2">{exclusion}</p>
          </div>
        ))}
      </div>
      <h3 className="text-headline5 text-primaryBlack">{t(`Shared.price`)}</h3>
      <div className="flex items-end gap-2">
        <CurrencyText amount={tour.pricePerPerson} /> <p className="text-body2 mb-0.5">{t("Shared.perPerson")}</p>
      </div>
      <TourContactModal dates={tour.dates} />
    </article>
  )
}

export default TourContactInfo
