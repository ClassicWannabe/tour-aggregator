"use client"
import React from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/common"
import { TourType } from "@/lib/interfaces/tours"

export default function FilterTabs() {
  const t = useTranslations("Shared")
  const filterTabs = [
    { key: "ALL", label: t("allTours") },
    { key: TourType.FIELD, label: t("fieldTrips") },
    { key: TourType.WALKING, label: t("walkingTours") },
    { key: TourType.CITY, label: t("cityTours") },
  ]
  return (
    <div className="flex mt-auto px-4 sm:px-16 md:px-[60px] lg:px-[120px] justify-center">
      {filterTabs.map((tab) => (
        <FilterTab key={tab.key} title={tab.label} tourTypeKey={tab.key} />
      ))}
    </div>
  )
}

type FilterTabProps = {
  title: string
  tourTypeKey: string
}

function FilterTab({ title, tourTypeKey }: FilterTabProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTourType = searchParams.get("type") || "ALL"

  const handleClick = () => {
    const currentParams = new URLSearchParams(searchParams)
    currentParams.set("type", tourTypeKey)
    if (currentTourType !== tourTypeKey) {
      router.push(`?${currentParams.toString()}`, { scroll: false })
    }
  }
  return (
    <span
      role="button"
      className={cn(
        "text-body1 text-primaryWhite flex items-center justify-center flex-1 px-1 sm:px-4 py-2 rounded-t-md transition-colors",
        currentTourType === tourTypeKey && "text-primaryGreen bg-primaryWhite",
      )}
      onClick={handleClick}
    >
      {title}
    </span>
  )
}
