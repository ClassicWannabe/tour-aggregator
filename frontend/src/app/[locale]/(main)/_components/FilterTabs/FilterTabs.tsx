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
    <div className="mt-auto flex justify-center px-4 sm:px-16 md:px-[60px] lg:px-[120px]">
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
        "text-body1 flex flex-1 items-center justify-center rounded-t-md px-1 py-2 text-primaryWhite transition-colors sm:px-4",
        currentTourType === tourTypeKey && "bg-primaryWhite text-primaryGreen",
      )}
      onClick={handleClick}
    >
      {title}
    </span>
  )
}
