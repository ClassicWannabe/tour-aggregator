"use client"

import { TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { TourStatus } from "@/lib/interfaces/tours"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"

export default function MyToursTabsTriggers() {
  const t = useTranslations("MyTours")
  const router = useRouter()

  const handleClick = (tourStatus?: TourStatus) => {
    const currentParams = new URLSearchParams()
    if (tourStatus) {
      currentParams.set("status", tourStatus)
    } else {
      currentParams.delete("status")
    }
    router.replace(`?${currentParams.toString()}`)
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
