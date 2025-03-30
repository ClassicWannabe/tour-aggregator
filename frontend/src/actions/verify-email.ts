import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"

export const verifyEmail = async (email: string, code: string): Promise<{ error?: string }> => {
  const url = makeFetchUrlPath(API_PATHS.verifyEmail)
  const body = JSON.stringify({ email, code })
  const response = await fetch(url, { method: "POST", body, headers: { "Content-type": "application/json" } })

  if (!response.ok) {
    return { error: response.statusText }
  }

  return {}
}
