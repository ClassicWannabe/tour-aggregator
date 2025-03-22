import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({ message: "FormErrors.notValidEmail" }).min(1, { message: "FormErrors.emailRequired" }),
  password: z.string().min(8, { message: "FormErrors.shortPassword" }),
})

export const SignUpSchema = z.object({
  email: z.string().email({ message: "FormErrors.notValidEmail" }).min(1, { message: "FormErrors.emailRequired" }),
  phone: z
    .string()
    .min(10, { message: "FormErrors.phoneRequired" })
    .max(15, { message: "FormErrors.phoneRequired" })
    .regex(/^[0-9]+$/, { message: "FormErrors.phoneRequired" }),
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

export const SignUpAgencyFieldsSchema = SignUpSchema.merge(
  z.object({
    companyName: z.string().min(1, { message: "FormErrors.companyNameRequired" }),
    ownerName: z.string().min(1, { message: "FormErrors.ownerNameRequired" }),
  }),
).refine(
  (data) => data.password === data.confirmPassword, // Check if passwords match
  {
    message: "FormErrors.passwordsMissMatch",
    path: ["confirmPassword"],
  },
)

export const SignUpGuideFieldsSchema = SignUpSchema.merge(
  z.object({
    firstName: z.string().min(1, { message: "FormErrors.firstNameRequired" }),
    lastName: z.string().min(1, { message: "FormErrors.lastNameRequired" }),
  }),
).refine(
  (data) => data.password === data.confirmPassword, // Check if passwords match
  {
    message: "FormErrors.passwordsMissMatch",
    path: ["confirmPassword"],
  },
)

export const BookTourSchema = z.object({
  dateId: z.string().min(1, { message: "FormErrors.dateIdRequired" }),
  email: z.string().email({ message: "FormErrors.notValidEmail" }).min(1, { message: "FormErrors.emailRequired" }),
  offeroAgreement: z
    .string()
    .min(1, { message: "FormErrors.offeroAgreementRequired" })
    .transform((val) => val === "on")
    .refine((val) => val, { message: "FormErrors.offeroAgreementRequired" }),
  phone: z
    .string()
    .min(10, { message: "FormErrors.phoneRequired" })
    .max(15, { message: "FormErrors.phoneRequired" })
    .regex(/^[0-9]+$/, { message: "FormErrors.phoneRequired" }),
  name: z.string().min(1, { message: "FormErrors.nameRequired" }),
})
