"use client"
import { useTranslations } from "next-intl"
import FormRadioGroup from "@/components/Form/FormRadioGroup"
import FormCheckboxMultiple from "@/components/Form/FormCheckboxMultiple"
import FormTitle from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormTitle"

export default function AmenitiesForm() {
  const t = useTranslations("AmenitiesForm")
  return (
    <>
      <FormTitle title={t("title1")} subtitle={t("subtitle1")} />
      <FormCheckboxMultiple
        name="inclusions"
        items={[
          { label: t("input.inclusions.value1"), value: t("input.inclusions.value1") },
          { label: t("input.inclusions.value2"), value: t("input.inclusions.value2") },
          { label: t("input.inclusions.value3"), value: t("input.inclusions.value3") },
        ]}
      />
      <div className="my-10">
        <FormTitle title={t("title2")} subtitle={t("subtitle2")} />
        <FormCheckboxMultiple
          name="exclusions"
          items={[
            { label: t("input.inclusions.value1"), value: t("input.inclusions.value1") },
            { label: t("input.inclusions.value2"), value: t("input.inclusions.value2") },
            { label: t("input.inclusions.value3"), value: t("input.inclusions.value3") },
          ]}
        />
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
