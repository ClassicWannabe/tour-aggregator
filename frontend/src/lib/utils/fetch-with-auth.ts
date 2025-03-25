import { cookies } from "next/headers"

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookie = await cookies()
  const accessToken = cookie.get("access_token")?.value

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${accessToken}`)
  headers.set("Content-Type", "application/json")

  return fetch(url, {
    ...options,
    headers,
  })
}
