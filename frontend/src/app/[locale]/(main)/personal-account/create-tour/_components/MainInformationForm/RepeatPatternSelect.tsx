import FormSelect from "@/components/Form/FormSelect"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { TourRepeatPattern } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm/schema"

export function RepeatPatternSelect() {
  const t = useTranslations("MainInformationForm.input.repeatPattern")

  const options = useMemo(() => {
    return Object.values(TourRepeatPattern).map((pattern) => ({ value: pattern, text: t(`value.${pattern}`) }))
  }, [t])

  return (
    <FormSelect
      name="recurringTour.repeatPattern"
      label={t("label")}
      placeholder={t("placeholder")}
      options={options}
    />
  )
}
