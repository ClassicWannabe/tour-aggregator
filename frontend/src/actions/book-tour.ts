"use server"

import { BookTourSchema } from "@/lib/consts/schemas"

type SignUpErrors = {
  email?: string[]
  phone?: string[]
  name?: string[]
  dateId?: string[]
  offeroAgreement?: string[]
}

export async function bookTour(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)
  if (!data.hasOwnProperty("offeroAgreement")) {
    data.offeroAgreement = "off"
  }

  const result = BookTourSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as SignUpErrors,
      payload: data,
    }
  }

  return {
    payload: data,
  }
}
