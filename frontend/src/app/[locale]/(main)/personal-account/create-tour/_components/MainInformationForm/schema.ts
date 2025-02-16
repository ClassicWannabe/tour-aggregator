import { z } from "zod"
import { Translate } from "@/lib/interfaces/translation"

export const mainInformationFormLimits = {
  title: { min: 10, max: 100 },
  location: { min: 1 },
  thesis: { min: 50, max: 200 },
  description: { min: 50, max: 3000 },
  pricePerPerson: { min: 1000, max: 10_000_000 },
  peopleCount: { min: 1, max: 100 },
} as const

export enum TourType {
  WALKING = "WALKING",
  CITY = "CITY",
  FIELD = "FIELD",
}

export const getMainInformationFormSchema = (t: Translate) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(mainInformationFormLimits.title.min, t("default.tooSmall", { minimum: mainInformationFormLimits.title.min }))
      .max(mainInformationFormLimits.title.max, t("default.tooBig", { maximum: mainInformationFormLimits.title.max })),
    location: z.string().min(mainInformationFormLimits.location.min, t("location.choose")),
    tourType: z.nativeEnum(TourType, { message: t("tourType.choose") }),
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
    dateRange: z
      .object({
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
      })
      .superRefine(({ startDate, endDate }, ctx) => {
        if (!startDate && !endDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("dateRange.missingDates"),
            path: ["dateRange"],
          })
        } else if (!startDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("dateRange.missingStartDate"),
            path: ["dateRange"],
          })
        } else if (!endDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("dateRange.missingEndDate"),
            path: ["dateRange"],
          })
        }
      }),
    peopleCount: z.coerce
      .number()
      .min(
        mainInformationFormLimits.peopleCount.min,
        t("peopleCount.tooSmall", { minimum: mainInformationFormLimits.peopleCount.min }),
      )
      .max(
        mainInformationFormLimits.peopleCount.max,
        t("peopleCount.tooBig", { maximum: mainInformationFormLimits.peopleCount.max }),
      ),
    priceInfo: z
      .object({
        pricePerPerson: z.coerce.number().int().optional(),
        isTourFree: z.boolean(),
      })
      .superRefine((schema, ctx) => {
        if (!schema.isTourFree) {
          if (!schema.pricePerPerson) {
            ctx.addIssue({
              path: ["pricePerPerson"],
              code: z.ZodIssueCode.custom,
              message: t("pricePerPerson.empty"),
            })
          } else if (schema.pricePerPerson < mainInformationFormLimits.pricePerPerson.min) {
            ctx.addIssue({
              path: ["pricePerPerson"],
              code: z.ZodIssueCode.custom,
              message: t("pricePerPerson.tooSmall", { minimum: mainInformationFormLimits.pricePerPerson.min }),
            })
          } else if (schema.pricePerPerson > mainInformationFormLimits.pricePerPerson.max) {
            ctx.addIssue({
              path: ["pricePerPerson"],
              code: z.ZodIssueCode.custom,
              message: t("pricePerPerson.tooBig", { maximum: mainInformationFormLimits.pricePerPerson.max }),
            })
          }
        }
        return schema.pricePerPerson && schema.pricePerPerson >= mainInformationFormLimits.pricePerPerson.min
      }),
    recurringTour: z
      .object({
        isRecurringTour: z.boolean(),
        recurringDates: z.array(z.date()),
      })
      .superRefine((schema, ctx) => {
        if (!schema.isRecurringTour) return

        if (!schema.recurringDates?.length) {
          ctx.addIssue({
            path: ["recurringDates"],
            code: z.ZodIssueCode.custom,
            message: t("recurringDates.tooSmall"),
          })
        }
      }),
  })

export type MainInformationFormType = z.infer<ReturnType<typeof getMainInformationFormSchema>>
