"use client"
import Input from "@/components/ui/Input"
import React, { useEffect } from "react"
import Slider from "rc-slider"
import { useTranslations } from "next-intl"
import CustomCheckbox from "@/components/CustomCheckbox"
import { TourFilters, TourType } from "@/lib/interfaces/tours"
import useToursFilterForm from "@/app/[locale]/(main)/tours/_hooks/useToursFilterForm"
import { useSearchParams } from "next/navigation"

export default function ToursFilterCommon({ filters }: { filters: TourFilters | null }) {
  const t = useTranslations()
  const { handleCheckboxChange, selectedTypes, setSelectedTypes, changePrices, changePriceInSlider, priceRange } =
    useToursFilterForm()
  const searchParams = useSearchParams()
  const types = searchParams.getAll("type")

  useEffect(() => {
    if (types) {
      setSelectedTypes(types)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body2 !font-semibold">{t("Filter.price")}</p>
      <Slider
        range
        value={[priceRange.minPricePerPerson, priceRange.maxPricePerPerson]}
        min={0}
        max={100}
        onChange={changePriceInSlider}
        styles={{ track: { background: "#00BE8B" }, handle: { background: "#fff", borderColor: "#00BE8B" } }}
      />
      <div className="flex gap-2">
        <Input
          name="minPricePerPerson"
          placeholder={t("Filter.from")}
          value={priceRange.minPricePerPerson}
          onChange={(e) => changePrices({ minPricePerPerson: Number(e.target.value) })}
        />
        <Input
          name="maxPricePerPerson"
          placeholder={t("Filter.to")}
          value={priceRange.maxPricePerPerson}
          onChange={(e) => changePrices({ maxPricePerPerson: Number(e.target.value) })}
        />
      </div>
      <p className="text-body2 !font-semibold">{t("Filter.tourType")}</p>
      <div className="flex flex-col gap-2">
        <CustomCheckbox
          label={t("Shared.allTours")}
          id="all-tours"
          name="type"
          value="ALL"
          onChange={handleCheckboxChange}
          checked={selectedTypes.includes("ALL")}
        />
        <CustomCheckbox
          label={t("Shared.fieldTrips")}
          id="field-tours"
          name="type"
          value={TourType.FIELD}
          onChange={handleCheckboxChange}
          checked={selectedTypes.includes(TourType.FIELD)}
        />
        <CustomCheckbox
          label={t("Shared.walkingTours")}
          id="walking-tours"
          name="type"
          value={TourType.WALKING}
          onChange={handleCheckboxChange}
          checked={selectedTypes.includes(TourType.WALKING)}
        />
        <CustomCheckbox
          label={t("Shared.cityTours")}
          id="city-tours"
          name="type"
          value={TourType.CITY}
          onChange={handleCheckboxChange}
          checked={selectedTypes.includes(TourType.CITY)}
        />
      </div>
      <span className="h-[1px] bg-lightGray" />
    </div>
  )
}
