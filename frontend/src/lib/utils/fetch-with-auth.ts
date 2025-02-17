export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = "tut token s sessiii"

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${token}`)
  headers.set("Content-Type", "application/json")

  return fetch(url, {
    ...options,
    headers,
  })
}
