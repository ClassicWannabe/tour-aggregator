"use client"
import { useTranslations } from "next-intl"
import FormTitle from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormTitle"
import FormTextarea from "@/components/Form/FormTextarea"
import FormInput from "@/components/Form/FormInput"
import { Separator } from "@/components/ui/Separator"
import { Dot, Trash } from "lucide-react"
import AddButton from "@/app/[locale]/(main)/personal-account/create-tour/_components/AddButton"
import { useFieldArray, useFormContext } from "react-hook-form"
import { tourProgramFormLimits } from "@/app/[locale]/(main)/personal-account/create-tour/_components/TourProgramForm/schema"
import { FormField, FormMessage } from "@/components/ui/Form"
import FormTimePicker from "@/components/Form/FormTimePicker"
import React from "react"

interface DayProgramInputsProps {
  dayIndex: number
}

export function DayProgramInputs({ dayIndex }: DayProgramInputsProps) {
  const t = useTranslations("TourProgramForm")
  const { control } = useFormContext()
  const inputName = `tourProgram.${dayIndex}`
  const { fields, append, remove } = useFieldArray({
    control,
    name: inputName,
  })

  const handleAddClick = () => {
    append({
      time: undefined,
      description: "",
    })
  }

  const handleRemoveClick = (index: number) => {
    remove(index)
  }

  return (
    <>
      <FormField
        name={inputName}
        render={() => {
          return (
            <>
              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="flex flex-row gap-5 mb-8">
                    <div className="relative flex">
                      <Dot className="absolute -top-5 -left-8 h-16 w-16 text-primaryGreen" />
                      <Separator orientation="vertical" className="h-auto mt-4" decorative />
                    </div>
                    <div className="flex flex-col gap-2 w-[50%]">
                      <div className="flex items-center justify-between">
                        <FormTimePicker
                          name={`${inputName}.${index}.time`}
                          label={t("input.time.label")}
                          timePickerProps={{
                            className: "max-w-40",
                            placeholder: t("input.time.placeholder"),
                            format: "HH:mm",
                            minuteStep: 5,
                            needConfirm: false,
                          }}
                        />
                        <Trash
                          className="h-8 w-8 cursor-pointer border rounded-lg p-1.5"
                          onClick={() => handleRemoveClick(index)}
                        />
                      </div>
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
                )
              })}
              <FormMessage className="relative" />
            </>
          )
        }}
      />

      <AddButton text={t("addButton")} buttonProps={{ onClick: handleAddClick, className: "my-10" }} />
    </>
  )
}
