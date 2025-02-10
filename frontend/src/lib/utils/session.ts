import { cookies } from "next/headers"

const ExpirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

export async function createSession(tokens: string) {
  const cookiesObject = await cookies()
  cookiesObject.set("access_token", tokens, {
    httpOnly: true,
    secure: true,
    expires: ExpirationDate,
  })
}
