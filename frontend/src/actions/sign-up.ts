"use server"

import { SignUpAgencyFieldsSchema, SignUpGuideFieldsSchema } from "@/lib/consts/schemas"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { API_PATHS } from "@/lib/consts/api-paths"
import { redirect } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { getLocale } from "next-intl/server"

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
  common?: string
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

  const { email, phone, password } = data
  const personalInfo = isGuideData
    ? { individualSupplier: { firstName: data.firstName, lastName: data.lastName } }
    : { companySupplier: { companyName: data.companyName, ownerName: data.ownerName } }

  const signUpReq = await fetch(makeFetchUrlPath(API_PATHS.signUp), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, phone, password, ...personalInfo }),
  })

  if (!signUpReq.ok) {
    return {
      payload: data,
      errors: {
        common: "CommonErrors.serverError",
      } as SignUpErrors,
    }
  }
  const locale = await getLocale()
  redirect({ href: RouteNames.SignIn, locale })
  return {
    payload: data,
  }
}
