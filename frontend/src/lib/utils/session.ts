"use server"
import { cookies } from "next/headers"

export async function setSession(token: string, exp: number) {
  const cookiesObject = await cookies()

  cookiesObject.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(exp),
  })
}

export async function verifySession() {
  const cookie = await cookies()
  const accessToken = cookie.get("access_token")?.value

  //Пока что просто наличие потом будет verification
  return !!accessToken
}
