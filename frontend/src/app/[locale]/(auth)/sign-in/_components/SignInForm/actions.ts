"use server"

import { createSession } from "@/lib/utils/session"
import { redirect } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { getLocale } from "next-intl/server"
import { SignInSchema } from "@/lib/consts/schemas"

type SignInErrors = {
  email?: string[]
  password?: string[]
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

  // if (email !== testUser.email || password !== testUser.password) {
  // SYUDA ZAPROZ NA token
  //   return {
  //     errors: {
  //       email: ["Invalid email or password"],
  //     },
  //   }
  // }

  // await createSession("token")
  // const locale = await getLocale()
  // redirect({ href: RouteNames.Home, locale })

  return {
    payload: data,
  }
}
