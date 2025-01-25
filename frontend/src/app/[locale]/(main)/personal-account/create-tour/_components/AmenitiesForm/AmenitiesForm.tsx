"use client"
import { useTranslations } from "next-intl"
import FormRadioGroup from "@/components/Form/FormRadioGroup"
import FormTitle from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormTitle"
import FormCheckboxMultipleDynamic from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormCheckboxMultipleDynamic"

export function AmenitiesForm() {
  const t = useTranslations("AmenitiesForm")

  const initialInclusions = [t("input.inclusions.value1"), t("input.inclusions.value2"), t("input.inclusions.value3")]
  return (
    <>
      <div className="flex flex-col gap-10 mb-10">
        <div>
          <FormTitle title={t("title1")} subtitle={t("subtitle1")} />
          <FormCheckboxMultipleDynamic
            name="inclusions"
            initialItems={initialInclusions}
            buttonProps={{ text: t("input.inclusions.addButton") }}
            inputProps={{ placeholder: t("input.inclusions.placeholder") }}
          />
        </div>
        <div>
          <FormTitle title={t("title2")} subtitle={t("subtitle2")} />
          <FormCheckboxMultipleDynamic
            name="exclusions"
            initialItems={initialInclusions}
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
      />
    </>
  )
}
