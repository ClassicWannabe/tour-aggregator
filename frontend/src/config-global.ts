import z from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_BASE_API_URL: z.string().url(),
})

const ENV = envSchema.parse({
  NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
})

export const CONFIG = {
  api: {
    baseUrl: ENV.NEXT_PUBLIC_BASE_API_URL,
  },
} as const
