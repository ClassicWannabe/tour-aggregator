import { z } from "zod"

const EmailSchema = z
  .string()
  .email({ message: "FormErrors.notValidEmail" })
  .min(1, { message: "FormErrors.emailRequired" })

const PhoneSchema = z.string().regex(/^\+77[0,7]\d{8}$/, { message: "FormErrors.phoneRequired" })

export const SignInSchema = z.object({
  email: EmailSchema,
  password: z.string().min(8, { message: "FormErrors.shortPassword" }),
})

export const SignUpSchema = z.object({
  email: EmailSchema,
  phone: PhoneSchema,
  password: z
    .string()
    .min(8, { message: "FormErrors.shortPassword" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
      message: "FormErrors.notValidPassword",
    }),
  confirmPassword: z.string().min(1, { message: "FormErrors.confirmPasswordRequired" }),
  socialLinks: z.array(z.string().url({ message: "FormErrors.notValidUrl" })).optional(),
  agreeToTermPolicy: z
    .string()
    .min(1, { message: "FormErrors.agreeToTermPolicyRequired" })
    .transform((val) => val === "on")
    .refine((val) => val, { message: "FormErrors.agreeToTermPolicyRequired" }),
  agreeToReceiveUpdates: z.string().optional(),
})

const AgencyFieldsSchema = z.object({
  companyName: z.string().min(1, { message: "FormErrors.companyNameRequired" }),
  ownerName: z.string().min(1, { message: "FormErrors.ownerNameRequired" }),
})

export const SignUpAgencyFieldsSchema = SignUpSchema.merge(AgencyFieldsSchema).refine(
  (data) => data.password === data.confirmPassword, // Check if passwords match
  {
    message: "FormErrors.passwordsMissMatch",
    path: ["confirmPassword"],
  },
)

const GuideFieldsSchema = z.object({
  firstName: z.string().min(1, { message: "FormErrors.firstNameRequired" }),
  lastName: z.string().min(1, { message: "FormErrors.lastNameRequired" }),
})

export const SignUpGuideFieldsSchema = SignUpSchema.merge(GuideFieldsSchema).refine(
  (data) => data.password === data.confirmPassword, // Check if passwords match
  {
    message: "FormErrors.passwordsMissMatch",
    path: ["confirmPassword"],
  },
)

export const BookTourSchema = z.object({
  dateId: z.string().min(1, { message: "FormErrors.dateIdRequired" }),
  email: EmailSchema,
  offeroAgreement: z
    .string()
    .min(1, { message: "FormErrors.offeroAgreementRequired" })
    .transform((val) => val === "on")
    .refine((val) => val, { message: "FormErrors.offeroAgreementRequired" }),
  phone: PhoneSchema,
  name: z.string().min(1, { message: "FormErrors.nameRequired" }),
})

const UpdateProfileSchema = z.object({
  email: EmailSchema,
  phone: PhoneSchema,
  aboutMe: z.string().max(100, { message: "FormErrors.longAboutMe" }),
})

export const UpdateProfileGuideSchema = UpdateProfileSchema.merge(GuideFieldsSchema)

export const UpdateProfileAgencySchema = UpdateProfileSchema.merge(AgencyFieldsSchema)
