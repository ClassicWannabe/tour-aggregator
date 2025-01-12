"use client"
import { useTranslations } from "next-intl"
import FormTitle from "@/app/[locale]/(main)/partners/tours/create/_components/FormTitle"
import { mainInformationFormLimits } from "@/app/[locale]/(main)/partners/tours/create/_components/schema"
import FormInput from "@/components/Form/FormInput"
import FormSelect from "@/components/Form/FormSelect"
import FormTextarea from "@/components/Form/FormTextarea"
import FormCheckbox from "@/components/Form/FormCheckbox"
import FormDateRangePicker from "@/components/Form/FormDateRangePicker"

const options = new Array(100).fill(1).map((_, i) => ({ value: `value${i}`, text: `значение${i}` }))
export default function MainInformationForm() {
  const t = useTranslations("MainInformationForm")
  return (
    <>
      <FormTitle title={t("title")} subtitle={t("subtitle")} />
      <div className="grid lg:grid-cols-2 lg:gap-x-6 gap-y-10">
        <FormInput
          name="tourName"
          label={t("input.tourName.label")}
          inputProps={{ placeholder: t("input.tourName.placeholder") }}
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
          name="tourPrice"
          label={t("input.tourPrice.label")}
          inputProps={{ placeholder: t("input.tourPrice.placeholder"), type: "number" }}
        />
        <FormCheckbox
          name="isTourFree"
          label={t("input.isTourFree.label")}
          containerProps={{ className: "items-end" }}
        />
        <FormDateRangePicker
          name="dateRange"
          startDateName="startDate"
          endDateName="endDate"
          label={t("input.dateRange.label")}
          placeholder={t("input.dateRange.placeholder")}
        />
        <FormInput
          name="numberOfPeople"
          label={t("input.numberOfPeople.label")}
          inputProps={{ placeholder: t("input.numberOfPeople.placeholder"), type: "number" }}
        />
      </div>
    </>
  )
}
