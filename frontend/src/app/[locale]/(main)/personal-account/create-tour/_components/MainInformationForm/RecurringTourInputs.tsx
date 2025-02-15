"use client"
import FormCheckbox from "@/components/Form/FormCheckbox"
import { useTranslations } from "next-intl"
import FormDatePicker from "@/components/Form/FormDatePicker"
import { useFormContext } from "react-hook-form"
import { MainInformationFormType } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/schema"
import dayjs from "dayjs"
import { useEffect } from "react"

export function RecurringTourInputs() {
  const t = useTranslations("MainInformationForm")
  const form = useFormContext()
  const isRecurringTour: boolean = form.watch("recurringTour.isRecurringTour")
  const dateRange: Partial<MainInformationFormType["dateRange"]> = form.watch("dateRange")

  useEffect(() => {
    form.resetField("recurringTour.recurringDates")
  }, [dateRange])

  return (
    <>
      <FormCheckbox
        name="recurringTour.isRecurringTour"
        label={t("input.isRecurringTour.label")}
        containerProps={{ className: "items-end" }}
      />
      {isRecurringTour && (
        <FormDatePicker
          name="recurringTour.recurringDates"
          label={t("input.recurringDates.label")}
          datePickerProps={{
            format: "DD.MM.YYYY",
            multiple: true,
            maxTagCount: "responsive",
            minDate: dayjs(dateRange.endDate),
          }}
        />
      )}
    </>
  )
}
