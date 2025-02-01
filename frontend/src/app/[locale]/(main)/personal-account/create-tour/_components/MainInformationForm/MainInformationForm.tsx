"use client"
import { useTranslations } from "next-intl"
import FormInput from "@/components/Form/FormInput"
import FormSelect from "@/components/Form/FormSelect"
import FormTextarea from "@/components/Form/FormTextarea"
import FormCheckbox from "@/components/Form/FormCheckbox"
import FormDateRangePicker from "@/components/Form/FormDateRangePicker"
import FormTitle from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormTitle"
import { useFormContext, useWatch } from "react-hook-form"
import { useEffect } from "react"
import { mainInformationFormLimits } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/schema"
import dayjs from "dayjs"
import { RecurringTourInputs } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/RecurringTourInputs"

const options = new Array(100).fill(1).map((_, i) => ({ value: `value${i}`, text: `значение${i}` }))
export function MainInformationForm() {
  const t = useTranslations("MainInformationForm")
  const isTourFree: boolean = useWatch({ name: "tourPrice.isTourFree" })
  const form = useFormContext()

  useEffect(() => {
    const isFormTouched = Object.values(form.formState.touchedFields).length > 0
    if (isFormTouched) {
      form.trigger("tourPrice.tourPrice")
    }

    if (isTourFree) {
      form.setValue("tourPrice.tourPrice", "")
    }
  }, [isTourFree])

  return (
    <>
      <FormTitle title={t("title")} subtitle={t("subtitle")} />
      <div className="grid lg:grid-cols-2 lg:gap-x-6 gap-y-10">
        <FormInput
          name="title"
          label={t("input.title.label")}
          inputProps={{ placeholder: t("input.title.placeholder") }}
          containerProps={{ className: "col-span-2" }}
        />
        <FormSelect
          name="location"
          placeholder={t("input.location.placeholder")}
          label={t("input.location.label")}
          options={options}
        />
        <FormSelect
          name="tourType"
          placeholder={t("input.tourType.placeholder")}
          label={t("input.tourType.label")}
          options={options}
        />
        <FormTextarea
          name="thesis"
          textareaProps={{ placeholder: t("input.thesis.placeholder") }}
          label={t("input.thesis.label")}
          helperText={t("input.thesis.helperText", {
            minSymbols: mainInformationFormLimits.thesis.min,
            maxSymbols: mainInformationFormLimits.thesis.max,
          })}
        />
        <FormTextarea
          name="description"
          textareaProps={{ placeholder: t("input.description.placeholder") }}
          label={t("input.description.label")}
          helperText={t("input.description.helperText", {
            minSymbols: mainInformationFormLimits.description.min,
            maxSymbols: mainInformationFormLimits.description.max,
          })}
        />
        <FormInput
          name="priceInfo.pricePerPerson"
          label={t("input.pricePerPerson.label")}
          inputProps={{
            placeholder: t("input.pricePerPerson.placeholder"),
            type: "number",
            disabled: isTourFree,
          }}
        />
        <FormCheckbox
          name="priceInfo.isTourFree"
          label={t("input.isTourFree.label")}
          containerProps={{ className: "items-end" }}
        />
        <FormDateRangePicker
          name="dateRange"
          startDateName="startDate"
          endDateName="endDate"
          label={t("input.dateRange.label")}
          datePickerProps={{
            showTime: { minuteStep: 5 },
            minDate: dayjs(),
            format: "DD.MM.YYYY HH:mm",
          }}
        />
        <FormInput
          name="peopleCount"
          label={t("input.peopleCount.label")}
          inputProps={{ placeholder: t("input.peopleCount.placeholder"), type: "number" }}
        />
        <RecurringTourInputs />
      </div>
    </>
  )
}
