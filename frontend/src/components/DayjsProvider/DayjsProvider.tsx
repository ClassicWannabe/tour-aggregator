"use client"

import { PropsWithChildren, useCallback, useEffect } from "react"
import dayjs from "dayjs"
import { Locale } from "@/i18n/routing"

type DayjsProviderProps = PropsWithChildren<{
  locale: Locale
}>

const DAYJS_LOCALE_MAP: Record<Locale, string> = {
  ru: "ru",
  kz: "kk",
  en: "en",
}

export function DayjsProvider({ locale, children }: DayjsProviderProps) {
  const getLocale = useCallback(() => {
    switch (locale) {
      case "ru":
        return import("dayjs/locale/ru")
      case "kz":
        return import("dayjs/locale/kk")
      default:
        return import("dayjs/locale/en")
    }
  }, [locale])
  useEffect(() => {
    getLocale()
      .then(() => {
        dayjs.locale(DAYJS_LOCALE_MAP[locale])
      })
      .catch(() => {
        console.error(`Unknown locale for ${DayjsProvider.name}: "${locale}"`)
      })
  }, [getLocale, locale])

  return <>{children}</>
}
