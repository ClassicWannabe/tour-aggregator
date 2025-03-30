import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"

export const sendEmailVerification = async (email: string): Promise<{ error?: string }> => {
  const url = makeFetchUrlPath(API_PATHS.sendEmailVerification)
  const body = JSON.stringify({ email })
  const response = await fetch(url, { method: "POST", body, headers: { "Content-type": "application/json" } })

  if (!response.ok) {
    return { error: response.statusText }
  }

  return {}
}
