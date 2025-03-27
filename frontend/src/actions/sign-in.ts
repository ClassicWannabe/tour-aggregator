"use server"

import { setSession } from "@/lib/utils/session"
import { redirect } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { getLocale } from "next-intl/server"
import { SignInSchema } from "@/lib/consts/schemas"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { API_PATHS } from "@/lib/consts/api-paths"

type SignInErrors = {
  email?: string[]
  password?: string[]
  common?: string
}

export async function signIn(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)
  const result = SignInSchema.safeParse(data)

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as SignInErrors,
      payload: data,
    }
  }

  const { email, password } = data

  const signInReq = await fetch(makeFetchUrlPath(API_PATHS.signIn), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!signInReq.ok) {
    if ([400, 401, 404].includes(signInReq.status)) {
      return {
        payload: data,
        errors: {
          common: "SignInErrors.invalidCredentials",
        } as SignInErrors,
      }
    }
    return {
      payload: data,
      errors: {
        common: "CommonErrors.serverError",
      } as SignInErrors,
    }
  }

  const { accessToken, exp } = await signInReq.json()
  await setSession(accessToken, exp)
  const locale = await getLocale()
  redirect({ href: RouteNames.Home, locale })

  return {
    payload: data,
  }
}
