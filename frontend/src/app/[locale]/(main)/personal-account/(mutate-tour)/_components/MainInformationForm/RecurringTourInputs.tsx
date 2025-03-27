"use client"
import FormCheckbox from "@/components/Form/FormCheckbox"
import { useTranslations } from "next-intl"
import FormDatePicker from "@/components/Form/FormDatePicker"
import { useFormContext } from "react-hook-form"
import dayjs from "dayjs"
import { useEffect } from "react"
import { MainInformationFormType } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/MainInformationForm/schema"

export function RecurringTourInputs() {
  const t = useTranslations("MainInformationForm")
  const form = useFormContext()
  const isRecurringTour: boolean = form.watch("recurringTour.isRecurringTour")
  const dateRange: Partial<MainInformationFormType["dateRange"]> = form.watch("dateRange")

  useEffect(() => {
    if (!isRecurringTour) {
      form.resetField("recurringTour.recurringDates")
    }
  }, [isRecurringTour])

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
            maxDate: dayjs().add(90, "days"),
          }}
        />
      )}
    </>
  )
}
