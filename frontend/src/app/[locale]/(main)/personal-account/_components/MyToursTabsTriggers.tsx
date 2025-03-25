"use client"

import { TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { TourStatus } from "@/lib/interfaces/tours"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { SearchParams } from "next/dist/server/request/search-params"
import getQueryFromSearchParams from "@/lib/utils/get-query-from-search-params"

type MyToursTabsTriggersProps = {
  searchParams: SearchParams
}

export default function MyToursTabsTriggers({ searchParams }: MyToursTabsTriggersProps) {
  const t = useTranslations("MyTours")
  const router = useRouter()

  const handleClick = (tourStatus?: TourStatus) => {
    const searchParamsStr = getQueryFromSearchParams(searchParams)
    const currentParams = new URLSearchParams(searchParamsStr)
    if (tourStatus) {
      currentParams.set("status", tourStatus)
    } else {
      currentParams.delete("status")
    }
    currentParams.delete("page")
    router.replace(`?${currentParams.toString()}`, { scroll: false })
  }

  return (
    <TabsList className="max-w-80">
      <TabsTrigger value="allTours" onClick={() => handleClick()}>
        {t("tabs.allTours")}
      </TabsTrigger>
      <TabsTrigger value={TourStatus.ACTIVE} onClick={() => handleClick(TourStatus.ACTIVE)}>
        {t("tabs.activeTours")}
      </TabsTrigger>
      <TabsTrigger value={TourStatus.FINISHED} onClick={() => handleClick(TourStatus.FINISHED)}>
        {t("tabs.finishedTours")}
      </TabsTrigger>
    </TabsList>
  )
}
