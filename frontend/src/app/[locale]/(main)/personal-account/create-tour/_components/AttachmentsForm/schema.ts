import { z } from "zod"
import { Translate } from "@/lib/interfaces/translation"

export const attachmentsFormLimits = {
  images: {
    min: 1,
    max: 20,
  },
} as const

const fileSizeLimitInMB = 5

const fileSizeLimitInBytes = fileSizeLimitInMB * 1024 * 1024 // 5MB

export const imageMimeTypes = ["image/png", "image/jpeg", "image/jpg"]

const imageSchema = z.instanceof(File)

export const getAttachmentsFormSchema = (t: Translate) =>
  z.object({
    images: z
      .array(
        z.object({
          file: imageSchema,
          link: z.string().url(),
        }),
      )
      .min(attachmentsFormLimits.images.min, t("images.tooSmall", { minimum: attachmentsFormLimits.images.min }))
      .max(attachmentsFormLimits.images.max, t("images.tooBig", { maximum: attachmentsFormLimits.images.max }))
      .refine(
        (images) => {
          return images.every((image) => imageMimeTypes.includes(image.file.type))
        },
        {
          message: t("images.invalidType"),
          path: ["images"],
        },
      )
      .refine(
        (images) => {
          return images.every((image) => image.file.size <= fileSizeLimitInBytes)
        },
        {
          message: t("images.tooBigSize", { MB: fileSizeLimitInMB }),
          path: ["images"],
        },
      ),
  })

export type AttachmentsFormType = z.infer<ReturnType<typeof getAttachmentsFormSchema>>
