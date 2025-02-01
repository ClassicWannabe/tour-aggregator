import { z } from "zod"
import { Translate } from "@/lib/interfaces/translation"

export const tourProgramFormLimits = {
  tourProgram: {
    min: 2,
    max: 30,
    description: { min: 20, max: 200 },
  },
} as const

export const getTourProgramFormSchema = (t: Translate) =>
  z.object({
    tourProgram: z
      .array(
        z.object({
          time: z.string(),
          description: z
            .string()
            .min(
              tourProgramFormLimits.tourProgram.description.min,
              t("default.tooSmall", { minimum: tourProgramFormLimits.tourProgram.description.min }),
            )
            .max(
              tourProgramFormLimits.tourProgram.description.max,
              t("default.tooBig", { maximum: tourProgramFormLimits.tourProgram.description.max }),
            ),
        }),
      )
      .min(
        tourProgramFormLimits.tourProgram.min,
        t("tourProgram.tooSmall", { minimum: tourProgramFormLimits.tourProgram.min }),
      )
      .max(
        tourProgramFormLimits.tourProgram.max,
        t("tourProgram.tooBig", { maximum: tourProgramFormLimits.tourProgram.max }),
      ),
    meetingPlace: z.string(),
  })

export type TourProgramFormType = z.infer<ReturnType<typeof getTourProgramFormSchema>>
