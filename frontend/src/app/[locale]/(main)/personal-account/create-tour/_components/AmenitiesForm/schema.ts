import { z } from "zod"
import { Translate } from "@/lib/interfaces/translation"

export const amenitiesFormLimits = {
  inclusions: {
    min: 1,
    max: 10,
  },
  exclusions: {
    min: 1,
    max: 10,
  },
}

export const getAmenitiesFormSchema = (t: Translate) =>
  z.object({
    isTransportIncluded: z
      .preprocess(
        (val) => {
          if (typeof val === "string") {
            return val === "true"
          }
          return val
        },
        z.boolean({ required_error: t("default.required") }),
      )
      .transform((val) => !!val),
    inclusions: z
      .array(z.string().trim().min(1))
      .min(
        amenitiesFormLimits.inclusions.min,
        t("inclusions.tooSmall", { minimum: amenitiesFormLimits.inclusions.min }),
      )
      .max(amenitiesFormLimits.inclusions.max, t("inclusions.tooBig", { maximum: amenitiesFormLimits.inclusions.max })),
    exclusions: z
      .array(z.string().trim().min(1))
      .min(amenitiesFormLimits.inclusions.min)
      .min(
        amenitiesFormLimits.exclusions.min,
        t("inclusions.tooSmall", { minimum: amenitiesFormLimits.exclusions.min }),
      )
      .max(amenitiesFormLimits.exclusions.max, t("inclusions.tooBig", { maximum: amenitiesFormLimits.exclusions.max })),
  })

export type AmenitiesFormType = z.infer<ReturnType<typeof getAmenitiesFormSchema>>
