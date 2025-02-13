import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
})

export const SignUpSchema = z.object({
  email: z.string().email({ message: "SignUpErrors.notValidEmail" }).min(1, { message: "SignUpErrors.emailRequired" }),
  phone: z
    .string()
    .min(10, { message: "SignUpErrors.phoneRequired" })
    .max(15, { message: "SignUpErrors.phoneRequired" })
    .regex(/^[0-9]+$/, { message: "SignUpErrors.phoneRequired" }),
  password: z
    .string()
    .min(8, { message: "SignUpErrors.shortPassword" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
      message: "SignUpErrors.notValidPassword",
    }),
  confirmPassword: z.string().min(1, { message: "SignUpErrors.confirmPasswordRequired" }),
  socialLinks: z.array(z.string().url({ message: "SignUpErrors.notValidUrl" })).optional(),
  agreeToTermPolicy: z
    .string()
    .transform((val) => val === "on")
    .refine((val) => val === true, { message: "SignUpErrors.agreeToTermPolicyRequired" }),
  agreeToReceiveUpdates: z.boolean().optional(),
})

export const SignUpAgencyFieldsSchema = SignUpSchema.merge(
  z.object({
    companyName: z.string().min(1, { message: "SignUpErrors.companyNameRequired" }),
    ownerName: z.string().min(1, { message: "SignUpErrors.ownerNameRequired" }),
  }),
).refine(
  (data) => data.password === data.confirmPassword, // Check if passwords match
  {
    message: "SignUpErrors.passwordsMissMatch",
    path: ["confirmPassword"],
  },
)

export const SignUpGuideFieldsSchema = SignUpSchema.merge(
  z.object({
    firstName: z.string().min(1, { message: "SignUpErrors.firstNameRequired" }),
    lastName: z.string().min(1, { message: "SignUpErrors.lastNameRequired" }),
  }),
).refine(
  (data) => data.password === data.confirmPassword, // Check if passwords match
  {
    message: "SignUpErrors.passwordsMissMatch",
    path: ["confirmPassword"],
  },
)
