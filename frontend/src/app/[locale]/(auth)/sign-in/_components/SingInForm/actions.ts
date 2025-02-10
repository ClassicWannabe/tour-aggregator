"use server"

import { createSession } from "@/lib/utils/session"
import { redirect } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { getLocale } from "next-intl/server"
import { SignInSchema } from "@/lib/consts/schemas"

export async function signIn(prevState: any, formData: FormData) {
  const result = SignInSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data

  // if (email !== testUser.email || password !== testUser.password) {
  // SYUDA ZAPROZ NA token
  //   return {
  //     errors: {
  //       email: ["Invalid email or password"],
  //     },
  //   }
  // }

  await createSession("token")
  const locale = await getLocale()
  redirect({ href: RouteNames.Home, locale })
}
