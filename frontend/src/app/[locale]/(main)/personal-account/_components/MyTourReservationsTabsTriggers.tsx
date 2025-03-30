"use client"

import { TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { TourStatus } from "@/lib/interfaces/tours"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { SearchParams } from "next/dist/server/request/search-params"
import getQueryFromSearchParams from "@/lib/utils/get-query-from-search-params"
import { MY_TOUR_RESERVATIONS_SEARCH_PARAMS } from "@/lib/consts/personal-account"

type MyToursTabsTriggersProps = {
  searchParams: SearchParams
}

export default function MyTourReservationsTabsTriggers({ searchParams }: MyToursTabsTriggersProps) {
  const t = useTranslations("MyTourReservations")
  const router = useRouter()

  const handleClick = (tourStatus?: TourStatus) => {
    const searchParamsStr = getQueryFromSearchParams(searchParams)
    const currentParams = new URLSearchParams(searchParamsStr)
    if (tourStatus) {
      currentParams.set(MY_TOUR_RESERVATIONS_SEARCH_PARAMS.tourStatus, tourStatus)
    } else {
      currentParams.delete(MY_TOUR_RESERVATIONS_SEARCH_PARAMS.tourStatus)
    }
    currentParams.delete(MY_TOUR_RESERVATIONS_SEARCH_PARAMS.page)
    router.replace(`?${currentParams.toString()}`, { scroll: false })
  }

  return (
    <TabsList className="max-w-80">
      <TabsTrigger value="allReservations" onClick={() => handleClick()}>
        {t("tabs.allReservations")}
      </TabsTrigger>
      <TabsTrigger value={TourStatus.ACTIVE} onClick={() => handleClick(TourStatus.ACTIVE)}>
        {t("tabs.activeReservations")}
      </TabsTrigger>
      <TabsTrigger value={TourStatus.FINISHED} onClick={() => handleClick(TourStatus.FINISHED)}>
        {t("tabs.finishedReservations")}
      </TabsTrigger>
    </TabsList>
  )
}
