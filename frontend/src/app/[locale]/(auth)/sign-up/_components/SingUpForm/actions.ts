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
}

export async function signUp(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)
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
