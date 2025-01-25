import { WeekdaysCheckboxMultiple } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/WeekdaysCheckboxMultiple"
import FormCheckbox from "@/components/Form/FormCheckbox"
import { useTranslations } from "next-intl"
import { RepeatPatternSelect } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/RepeatPatternSelect"

export function RecurringTourInputs() {
  const t = useTranslations("MainInformationForm")

  return (
    <>
      <FormCheckbox
        name="recurringTour.isRecurringTour"
        label={t("input.isRecurringTour.label")}
        containerProps={{ className: "items-end" }}
      />
      <WeekdaysCheckboxMultiple />
      <RepeatPatternSelect />
      <FormCheckbox
        name="recurringTour.withoutEndDate"
        label={t("input.withoutEndDate.label")}
        containerProps={{ className: "items-end" }}
      />
    </>
  )
}
