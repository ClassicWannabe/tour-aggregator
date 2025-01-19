import { z } from "zod"

export const mainInformationFormLimits = {
  tourName: { min: 10 },
  location: { min: 1 },
  tourType: { min: 1 },
  thesis: { min: 50, max: 200 },
  description: { min: 50, max: 3000 },
  tourPrice: { min: 1000 },
  numberOfPeople: { min: 1, max: 100 },
} as const

export const mainInformationFormSchema = z.object({
  tourName: z.string().trim().min(mainInformationFormLimits.tourName.min),
  location: z.string().min(mainInformationFormLimits.location.min),
  tourType: z.string().min(mainInformationFormLimits.tourType.min),
  thesis: z.string().trim().min(mainInformationFormLimits.thesis.min).max(mainInformationFormLimits.thesis.max),
  description: z
    .string()
    .trim()
    .min(mainInformationFormLimits.description.min)
    .max(mainInformationFormLimits.description.max),
  tourPrice: z.coerce.number().min(mainInformationFormLimits.tourPrice.min),
  isTourFree: z.boolean(),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  numberOfPeople: z.coerce
    .number()
    .min(mainInformationFormLimits.numberOfPeople.min)
    .max(mainInformationFormLimits.numberOfPeople.max),
})

export type MainInformationFormType = z.infer<typeof mainInformationFormSchema>

type TransformToString<T> = T extends z.ZodObject<any> ? T : T extends z.ZodArray<any> ? T : T | string

export const amenitiesFormSchema = z.object({
  isTransportIncluded: z
    .preprocess((val) => {
      if (typeof val === "string") {
        return val === "true"
      }
      return val
    }, z.boolean())
    .transform((val) => !!val),
  inclusions: z.array(z.string().trim().min(1)).min(1),
  exclusions: z.array(z.string().trim().min(1)),
})

export type AmenitiesFormType = z.infer<typeof amenitiesFormSchema>

export const tourProgramFormLimits = {
  tourProgram: {
    min: 2,
    max: 30,
    location: { min: 50, max: 200 },
  },
} as const

export const tourProgramFormSchema = z.object({
  tourProgram: z
    .array(
      z.object({
        time: z.string(),
        location: z
          .string()
          .min(tourProgramFormLimits.tourProgram.location.min)
          .max(tourProgramFormLimits.tourProgram.location.max),
      }),
    )
    .min(tourProgramFormLimits.tourProgram.min)
    .max(tourProgramFormLimits.tourProgram.max),
  meetingPlace: z.string(),
})

export type TourProgramFormType = z.infer<typeof tourProgramFormSchema>

const fileSizeLimit = 5 * 1024 * 1024 // 5MB
const imageSchema = z
  .instanceof(File)
  .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
    message: "Invalid image file type",
  })
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5MB",
  })

export const attachmentsFormSchema = z.object({
  images: z
    .array(
      z.object({
        file: imageSchema,
        link: z.string().url(),
      }),
    )
    .min(2),
})

export type AttachmentsFormType = z.infer<typeof attachmentsFormSchema>

export const formSchema = mainInformationFormSchema
  .merge(amenitiesFormSchema)
  .merge(tourProgramFormSchema)
  .merge(attachmentsFormSchema)

export type FormSchemaType = z.infer<typeof formSchema>

export type FormType = { [key in keyof FormSchemaType]: TransformToString<FormSchemaType[key]> }
