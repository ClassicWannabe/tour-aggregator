export type Pagination = {
  count: number
  limit: number
  offset: number
}

export type ActionState =
  | {
      message?: string
      status?: string
      error?: Record<string, string>
      payload?: Record<string, any>
    }
  | null
  | undefined
