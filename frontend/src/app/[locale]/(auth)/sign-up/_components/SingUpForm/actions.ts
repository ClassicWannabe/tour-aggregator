"use server"

import { SignUpAgencyFieldsSchema, SignUpGuideFieldsSchema } from "@/lib/consts/schemas"

type SignUpErrors = {
  email?: string[]
  phone?: string[]
  password?: string[]
  confirmPassword?: string[]
  socialLinks?: string[]
  firstName?: string[]
  lastName?: string[]
  companyName?: string[]
  ownerName?: string[]
  agreeToTermPolicy?: string[]
  agreeToReceiveUpdates?: string[]
}

export async function signUp(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)
  if (!data.hasOwnProperty("agreeToTermPolicy")) {
    data.agreeToTermPolicy = "off"
  }
  if (!data.hasOwnProperty("agreeToReceiveUpdates")) {
    data.agreeToReceiveUpdates = "off"
  }
  const isGuideData = data.hasOwnProperty("firstName")
  const result = isGuideData ? SignUpGuideFieldsSchema.safeParse(data) : SignUpAgencyFieldsSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as SignUpErrors,
      payload: data,
    }
  }

  return {
    payload: data,
  }
}
