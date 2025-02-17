import "server-only"
import { cookies } from "next/headers"

// const ExpirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

export async function setSession(token: string) {
  const cookiesObject = await cookies()

  cookiesObject.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // expires: tokenInfo.exp,
  })
}
