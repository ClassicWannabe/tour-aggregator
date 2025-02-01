"use client"
import { useTranslations } from "next-intl"
import FormTitle from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormTitle"
import FormTextarea from "@/components/Form/FormTextarea"
import FormInput from "@/components/Form/FormInput"
import { Separator } from "@/components/ui/Separator"
import { Dot } from "lucide-react"
import AddButton from "@/app/[locale]/(main)/personal-account/create-tour/_components/AddButton"
import { useFieldArray, useFormContext } from "react-hook-form"
import { tourProgramFormLimits } from "@/app/[locale]/(main)/personal-account/create-tour/_components/TourProgramForm/schema"
import { FormField, FormMessage } from "@/components/ui/Form"

export function TourProgramForm() {
  const t = useTranslations("TourProgramForm")
  const { control } = useFormContext()
  const inputName = "tourProgram"
  const { fields, append } = useFieldArray({
    control,
    name: inputName,
  })

  const handleAddClick = () => {
    append({
      time: "",
      description: "",
    })
  }
  return (
    <>
      <FormTitle title={t("title1")} subtitle={t("subtitle1")} />
      <FormField
        name="tourProgram"
        render={() => {
          return (
            <>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-row gap-5 mb-8">
                  <div className="relative flex">
                    <Dot className="absolute -top-5 -left-8 h-16 w-16 text-primaryGreen" />
                    <Separator orientation="vertical" className="h-auto mt-4" decorative />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <FormInput
                      name={`${inputName}.${index}.time`}
                      label={t("input.time.label")}
                      inputProps={{ className: "max-w-36", placeholder: t("input.time.placeholder") }}
                    />
                    <FormTextarea
                      name={`${inputName}.${index}.description`}
                      label={t("input.description.label")}
                      helperText={t("input.description.helperText", {
                        minSymbols: tourProgramFormLimits.tourProgram.description.min,
                        maxSymbols: tourProgramFormLimits.tourProgram.description.max,
                      })}
                      textareaProps={{ placeholder: t("input.description.placeholder"), rows: 4 }}
                    />
                  </div>
                </div>
              ))}
              <FormMessage className="relative" />
            </>
          )
        }}
      />

      <AddButton text={t("addButton")} buttonProps={{ onClick: handleAddClick, className: "my-10" }} />

      <FormTitle title={t("title2")} subtitle={t("subtitle2")} />
      <FormInput
        name="meetinPlace"
        label={t("input.meetingPlace.label")}
        inputProps={{ placeholder: t("input.meetingPlace.placeholder") }}
      />
    </>
  )
}
