import { z } from "zod"
import { Translate } from "@/lib/interfaces/translation"

export const mainInformationFormLimits = {
  tourName: { min: 10, max: 100 },
  location: { min: 1 },
  tourType: { min: 1 },
  thesis: { min: 50, max: 200 },
  description: { min: 50, max: 3000 },
  tourPrice: { min: 1000, max: 10_000_000 },
  numberOfPeople: { min: 1, max: 100 },
} as const

export const getMainInformationFormSchema = (t: Translate) =>
  z.object({
    tourName: z
      .string()
      .trim()
      .min(
        mainInformationFormLimits.tourName.min,
        t("default.tooSmall", { minimum: mainInformationFormLimits.tourName.min }),
      )
      .max(
        mainInformationFormLimits.tourName.max,
        t("default.tooBig", { maximum: mainInformationFormLimits.tourName.max }),
      ),
    location: z.string().min(mainInformationFormLimits.location.min, t("location.choose")),
    tourType: z.string().min(mainInformationFormLimits.tourType.min, t("tourType.choose")),
    thesis: z
      .string()
      .trim()
      .min(
        mainInformationFormLimits.thesis.min,
        t("default.tooSmall", { minimum: mainInformationFormLimits.thesis.min }),
      )
      .max(
        mainInformationFormLimits.thesis.max,
        t("default.tooBig", { maximum: mainInformationFormLimits.thesis.max }),
      ),
    description: z
      .string()
      .trim()
      .min(
        mainInformationFormLimits.description.min,
        t("default.tooSmall", { minimum: mainInformationFormLimits.description.min }),
      )
      .max(
        mainInformationFormLimits.description.max,
        t("default.tooBig", { maximum: mainInformationFormLimits.description.max }),
      ),
    dateRange: z.object({
      startDate: z.date(),
      endDate: z.date(),
    }),
    numberOfPeople: z.coerce
      .number()
      .min(
        mainInformationFormLimits.numberOfPeople.min,
        t("numberOfPeople.tooSmall", { minimum: mainInformationFormLimits.numberOfPeople.min }),
      )
      .max(
        mainInformationFormLimits.numberOfPeople.max,
        t("numberOfPeople.tooBig", { maximum: mainInformationFormLimits.numberOfPeople.max }),
      ),
    tourPrice: z
      .object({
        tourPrice: z.coerce.number().optional(),
        isTourFree: z.boolean(),
      })
      .superRefine((schema, ctx) => {
        if (!schema.isTourFree) {
          if (!schema.tourPrice) {
            ctx.addIssue({
              path: ["tourPrice"],
              code: z.ZodIssueCode.custom,
              message: t("tourPrice.empty"),
            })
          } else if (schema.tourPrice < mainInformationFormLimits.tourPrice.min) {
            ctx.addIssue({
              path: ["tourPrice"],
              code: z.ZodIssueCode.custom,
              message: t("tourPrice.tooSmall", { minimum: mainInformationFormLimits.tourPrice.min }),
            })
          } else if (schema.tourPrice > mainInformationFormLimits.tourPrice.max) {
            ctx.addIssue({
              path: ["tourPrice"],
              code: z.ZodIssueCode.custom,
              message: t("tourPrice.tooBig", { maximum: mainInformationFormLimits.tourPrice.max }),
            })
          }
        }
        return schema.tourPrice && schema.tourPrice >= mainInformationFormLimits.tourPrice.min
      }),
  })

export type MainInformationFormType = z.infer<ReturnType<typeof getMainInformationFormSchema>>
