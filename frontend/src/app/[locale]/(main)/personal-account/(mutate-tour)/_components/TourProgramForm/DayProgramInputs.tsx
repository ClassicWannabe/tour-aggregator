"use client"
import { useTranslations } from "next-intl"
import FormTextarea from "@/components/Form/FormTextarea"
import { Separator } from "@/components/ui/Separator"
import { Dot, Trash } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { FormField, FormMessage } from "@/components/ui/Form"
import FormTimePicker from "@/components/Form/FormTimePicker"
import React from "react"
import { tourProgramFormLimits } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/TourProgramForm/schema"
import AddButton from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/AddButton"

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
                  <div key={field.id} className="mb-8 flex flex-row gap-5">
                    <div className="relative flex">
                      <Dot className="absolute -left-8 -top-5 h-16 w-16 text-primaryGreen" />
                      <Separator orientation="vertical" className="mt-4 h-auto" decorative />
                    </div>
                    <div className="flex w-[50%] flex-col gap-2">
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
                          className="h-8 w-8 cursor-pointer rounded-lg border p-1.5"
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
