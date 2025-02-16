import { CONFIG } from "@/config-global"
import { API_PATHS } from "@/lib/consts/api-paths"
import { ExtractStrings } from "@/lib/interfaces/util"

type Endpoint = ExtractStrings<typeof API_PATHS>

export class FetchClient {
  private readonly baseUrl: string
  private headers: HeadersInit

  constructor(baseUrl: string, defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl
    this.headers = {
      ...defaultHeaders,
    }
  }

  private async request<T>(
    endpoint: string,
    method: string,
    body?: unknown,
    queryParams?: Record<string, string>,
  ): Promise<T> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`)

      if (queryParams) {
        Object.keys(queryParams).forEach((key) => url.searchParams.append(key, queryParams[key]))
      }

      const response = await fetch(url.toString(), {
        method,
        headers: this.getHeaders(body),
        body: this.getBody(body),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return (await response.json()) as T
    } catch (error) {
      console.error("FetchClient error:", error)
      throw error
    }
  }

  private getHeaders(body?: unknown) {
    if (body instanceof FormData) {
      return this.headers
    }

    return { ...this.headers, "Content-Type": "application/json" }
  }

  private getBody(body?: unknown) {
    if (!body) {
      return undefined
    }
    if (body instanceof FormData) {
      return body
    }
    return JSON.stringify(body)
  }

  get<T>(endpoint: Endpoint, queryParams?: Record<string, string>) {
    return this.request<T>(endpoint, "GET", undefined, queryParams)
  }

  post<T>(endpoint: Endpoint, body?: unknown) {
    return this.request<T>(endpoint, "POST", body)
  }

  put<T>(endpoint: Endpoint, body?: unknown) {
    return this.request<T>(endpoint, "PUT", body)
  }

  delete<T>(endpoint: Endpoint) {
    return this.request<T>(endpoint, "DELETE")
  }

  setAuthToken(token: string) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    }
  }
}

export const apiClient = new FetchClient(CONFIG.api.baseUrl, {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYzU4ZTFlNy0xYzgzLTQ5YjMtOWU3NS1hZDczNzdlZTAwNmYiLCJlbWFpbCI6InJ1c2xhbmVsZXVzaW5vdkBnbWFpbC5jb20iLCJpYXQiOjE3Mzk2NDYwMzQsImV4cCI6MTc0MDI1MDgzNH0.D8QIKVX1nPWfzmOadn7D5Plt0PnizlPtEd5y9rKrDm4",
})
