import { Translate } from "@/lib/interfaces/translation"
import { z } from "zod"
import { getMainInformationFormSchema } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm"
import { getAmenitiesFormSchema } from "@/app/[locale]/(main)/personal-account/create-tour/_components/AmenitiesForm"
import { getTourProgramFormSchema } from "@/app/[locale]/(main)/personal-account/create-tour/_components/TourProgramForm"
import { getAttachmentsFormSchema } from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm"

export const getFormSchema = (t: Translate) => {
  const mainInformationFormSchema = getMainInformationFormSchema(t)
  const amenitiesFormSchema = getAmenitiesFormSchema(t)
  const tourProgramFormSchema = getTourProgramFormSchema(t)
  const attachmentsFormSchema = getAttachmentsFormSchema(t)

  return mainInformationFormSchema.merge(amenitiesFormSchema).merge(tourProgramFormSchema).merge(attachmentsFormSchema)
}

export type FormType = z.infer<ReturnType<typeof getFormSchema>>

type TransformToString<T> =
  T extends Record<string, unknown> ? { [key in keyof T]: TransformToString<T[key]> } : T | string

export type FormTypeStringified = { [key in keyof FormType]: TransformToString<FormType[key]> }

export const getSchemas = (t: Translate) => {
  const formSchema = getFormSchema(t)
  const mainInformationFormSchema = getMainInformationFormSchema(t)
  const amenitiesFormSchema = getAmenitiesFormSchema(t)
  const tourProgramFormSchema = getTourProgramFormSchema(t)
  const attachmentsFormSchema = getAttachmentsFormSchema(t)

  return {
    formSchema,
    mainInformationFormSchema,
    amenitiesFormSchema,
    tourProgramFormSchema,
    attachmentsFormSchema,
  }
}
