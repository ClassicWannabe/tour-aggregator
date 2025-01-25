import { z } from "zod"
import { Translate } from "@/lib/interfaces/translation"

export const tourProgramFormLimits = {
  tourProgram: {
    min: 3,
    max: 30,
    location: { min: 50, max: 200 },
  },
} as const

export const getTourProgramFormSchema = (t: Translate) =>
  z.object({
    tourProgram: z
      .array(
        z.object({
          time: z.string(),
          location: z
            .string()
            .min(
              tourProgramFormLimits.tourProgram.location.min,
              t("default.tooSmall", { minimum: tourProgramFormLimits.tourProgram.location.min }),
            )
            .max(
              tourProgramFormLimits.tourProgram.location.max,
              t("default.tooBig", { maximum: tourProgramFormLimits.tourProgram.location.max }),
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
