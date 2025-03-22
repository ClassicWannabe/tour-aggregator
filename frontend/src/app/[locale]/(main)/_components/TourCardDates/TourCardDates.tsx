import React from "react"
import Badge from "@/components/ui/Badge"
import { formatDateToCustomString } from "@/lib/utils/common"
import { Tour } from "@/lib/interfaces/tours"

type Props = {
  dates: Tour["dates"]
  locale: string
}

const TourCardDates: React.FC<Props> = ({ dates, locale }) => {
  const startDate = !!dates && !!dates.length && dates[0]?.startDate
  const endDate = !!dates && !!dates.length && dates[dates.length - 1]?.endDate

  return (
    <div className="flex gap-1 items-center">
      {!!startDate && <Badge text={formatDateToCustomString(startDate, locale)} />}
      {!!endDate && <Badge text={formatDateToCustomString(endDate, locale)} />}
    </div>
  )
}

export default TourCardDates
