"use server"

import { Tour } from "@/lib/interfaces/tours"
import { API_PATHS } from "@/lib/consts/api-paths"
import makeFetchUrlPath from "@/lib/utils/make-fetch-url-path"
import { redirect } from "@/i18n/routing"
import { getLocale } from "next-intl/server"
import RouteNames from "@/lib/consts/route-names"

export default async function getTour(tourId: string): Promise<Tour> {
  const data = await fetch(makeFetchUrlPath(API_PATHS.tourById(tourId)))
  if (!data.ok) {
    const locale = await getLocale()
    redirect({ href: RouteNames.Category, locale })
  }
  return data.json()
}
