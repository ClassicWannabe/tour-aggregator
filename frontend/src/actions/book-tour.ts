"use server"

import { BookTourSchema } from "@/lib/consts/schemas"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { API_PATHS } from "@/lib/consts/api-paths"

type BookTourErrors = {
  email?: string[]
  phone?: string[]
  name?: string[]
  dateId?: string[]
  offeroAgreement?: string[]
  common?: string
}

export async function bookTour(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData)
  if (!data.hasOwnProperty("offeroAgreement")) {
    data.offeroAgreement = "off"
  }

  const result = BookTourSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as BookTourErrors,
      payload: data,
    }
  }

  // const { email, phone, name, dateId } = data
  //
  // const bookReq = await fetch(makeFetchUrlPath(API_PATHS.bookTour), {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, phone, name, dateId }),
  // })
  //
  // if (!bookReq.ok) {
  //   return {
  //     payload: data,
  //     errors: {
  //       common: "TourDetails.bookResponseError",
  //     } as BookTourErrors,
  //     status: "ERROR",
  //     message: "TourDetails.bookResponseError",
  //   }
  // }

  return {
    status: "SUCCESS",
    message: "TourDetails.bookResponseSuccess",
    payload: data,
  }
}
