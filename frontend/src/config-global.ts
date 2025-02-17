import z from "zod"

// TODO: Investigate the issue with NEXT_PUBLIC_*
const envSchema = z.object({
  NEXT_PUBLIC_BASE_API_URL: z.string().url().default("http://localhost:3001/api"),
})

const ENV = envSchema.parse(process.env)

export const CONFIG = {
  api: {
    baseUrl: ENV.NEXT_PUBLIC_BASE_API_URL,
  },
} as const
