"use client"
import Input from "@/components/ui/Input"
import React from "react"
import Slider from "rc-slider"
import { useTranslations } from "next-intl"
import CustomCheckbox from "@/components/CustomCheckbox"
import { TourType } from "@/lib/interfaces/tours"

export default function ToursFilterCommon() {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body2 !font-semibold">{t("Filter.price")}</p>
      <Slider
        range
        min={0}
        max={100}
        defaultValue={[0, 100]}
        styles={{ track: { background: "#00BE8B" }, handle: { background: "#fff", borderColor: "#00BE8B" } }}
      />
      <div className="flex gap-2">
        <Input name="priceFrom" placeholder={t("Filter.from")} />
        <Input name="priceTo" placeholder={t("Filter.to")} />
      </div>
      <p className="text-body2 !font-semibold">{t("Filter.tourType")}</p>
      <div className="flex flex-col gap-2">
        <CustomCheckbox label={t("Shared.allTours")} id="all-tours" name="type" value="all" />
        <CustomCheckbox label={t("Shared.fieldTrips")} id="field-tours" name="type" value={TourType.FIELD} />
        <CustomCheckbox label={t("Shared.walkingTours")} id="walking-tours" name="type" value={TourType.WALKING} />
        <CustomCheckbox label={t("Shared.cityTours")} id="city-tours" name="type" value={TourType.CITY} />
      </div>
      <span className="h-[1px] bg-lightGray" />
    </div>
  )
}
