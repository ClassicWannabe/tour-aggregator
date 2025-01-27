"use client"
import FormCheckboxMultiple from "@/components/Form/FormCheckboxMultiple"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { Weekday } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/schema"

export function WeekdaysCheckboxMultiple() {
  const t = useTranslations("MainInformationForm.input.weekdays")

  const items = useMemo(() => {
    return Object.values(Weekday).map((weekday) => ({ value: weekday, label: t(`value.${weekday}`) }))
  }, [t])

  return <FormCheckboxMultiple name="recurringTour.weekdays" label={t("label")} items={items} row />
}
