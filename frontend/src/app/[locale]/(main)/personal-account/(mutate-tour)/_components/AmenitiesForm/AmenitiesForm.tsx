"use client"
import { useTranslations } from "next-intl"
import FormRadioGroup from "@/components/Form/FormRadioGroup"
import FormCheckboxMultipleDynamic from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/FormCheckboxMultipleDynamic"
import FormTitle from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/FormTitle"
import { useFormContext } from "react-hook-form"
import { FormType } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/MutateTourForm/schema"
import { useMemo } from "react"

export function AmenitiesForm() {
  const t = useTranslations("AmenitiesForm")
  const form = useFormContext<FormType>()
  const defaultInclusions = useMemo(() => form.getValues("inclusions"), [])
  const defaultExclusions = useMemo(() => form.getValues("exclusions"), [])

  const initialAmenities = [t("input.inclusions.value1"), t("input.inclusions.value2"), t("input.inclusions.value3")]
  const getInitialInclusions = () => {
    return [...new Set([...initialAmenities, ...defaultInclusions])]
  }

  const getInitialExclusions = () => {
    return [...new Set([...initialAmenities, ...defaultExclusions])]
  }
  return (
    <>
      <div className="mb-10 flex flex-col gap-10">
        <div>
          <FormTitle title={t("title1")} subtitle={t("subtitle1")} />
          <FormCheckboxMultipleDynamic
            name="inclusions"
            initialItems={getInitialInclusions()}
            buttonProps={{ text: t("input.inclusions.addButton") }}
            inputProps={{ placeholder: t("input.inclusions.placeholder") }}
          />
        </div>
        <div>
          <FormTitle title={t("title2")} subtitle={t("subtitle2")} />
          <FormCheckboxMultipleDynamic
            name="exclusions"
            initialItems={getInitialExclusions()}
            buttonProps={{ text: t("input.inclusions.addButton") }}
            inputProps={{ placeholder: t("input.inclusions.placeholder") }}
          />
        </div>
      </div>
      <FormRadioGroup
        name="isTransportIncluded"
        label={t("input.isTransportIncluded.label")}
        items={[
          { label: t("input.isTransportIncluded.yes"), value: "true" },
          { label: t("input.isTransportIncluded.no"), value: "false" },
        ]}
        valueResolver={(value) => (value ? "true" : "false")}
      />
    </>
  )
}
