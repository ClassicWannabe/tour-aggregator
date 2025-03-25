import { Translate } from "@/lib/interfaces/translation"
import { z } from "zod"
import { getMainInformationFormSchema } from "../MainInformationForm"
import { getAmenitiesFormSchema } from "../AmenitiesForm"
import { getTourProgramFormSchema } from "../TourProgramForm"
import { getAttachmentsFormSchema } from "../AttachmentsForm"

export const getFormSchema = (t: Translate) => {
  const mainInformationFormSchema = getMainInformationFormSchema(t)
  const amenitiesFormSchema = getAmenitiesFormSchema(t)
  const tourProgramFormSchema = getTourProgramFormSchema(t)
  const attachmentsFormSchema = getAttachmentsFormSchema(t)

  return mainInformationFormSchema.merge(amenitiesFormSchema).merge(tourProgramFormSchema).merge(attachmentsFormSchema)
}

export type FormType = z.infer<ReturnType<typeof getFormSchema>>

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
