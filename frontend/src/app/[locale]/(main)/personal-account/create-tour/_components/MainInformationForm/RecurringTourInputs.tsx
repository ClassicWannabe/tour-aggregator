"use client"
import { WeekdaysCheckboxMultiple } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/WeekdaysCheckboxMultiple"
import FormCheckbox from "@/components/Form/FormCheckbox"
import { useTranslations } from "next-intl"
import { RepeatPatternSelect } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/RepeatPatternSelect"
import FormDatePicker from "@/components/Form/FormDatePicker"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

export function RecurringTourInputs() {
  const t = useTranslations("MainInformationForm")
  const form = useFormContext()
  const isRecurringTour: boolean = form.watch("recurringTour.isRecurringTour")
  const withoutEndDate: boolean = form.watch("recurringTour.withoutEndDate")

  useEffect(() => {
    if (withoutEndDate) {
      form.setValue("recurringTour.endRecurringDate", undefined)
      form.trigger("recurringTour.endRecurringDate")
    }
  }, [withoutEndDate])

  return (
    <>
      <FormCheckbox
        name="recurringTour.isRecurringTour"
        label={t("input.isRecurringTour.label")}
        containerProps={{ className: "items-end" }}
      />
      {isRecurringTour && (
        <>
          <WeekdaysCheckboxMultiple />
          <RepeatPatternSelect />
          <br />
          <FormDatePicker
            name="recurringTour.endRecurringDate"
            label={t("input.endRecurringDate.label")}
            datePickerProps={{ disabled: withoutEndDate, format: "DD.MM.YYYY" }}
          />
          <FormCheckbox
            name="recurringTour.withoutEndDate"
            label={t("input.withoutEndDate.label")}
            containerProps={{ className: "items-end" }}
          />
        </>
      )}
    </>
  )
}
