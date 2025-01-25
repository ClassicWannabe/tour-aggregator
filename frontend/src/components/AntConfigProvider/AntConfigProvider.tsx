"use client"
import { ConfigProvider } from "antd"
import { ComponentProps } from "react"
import { Locale } from "@/i18n/routing"
import ruLocale from "antd/locale/ru_RU"
import kzLocale from "antd/locale/kk_KZ"

type ConfigProviderProps = ComponentProps<typeof ConfigProvider>
type AntConfigProviderProps = Omit<ConfigProviderProps, "locale"> & { locale: Locale }

export function AntConfigProvider({ locale, ...restProps }: AntConfigProviderProps) {
  let antLocale: ConfigProviderProps["locale"]

  switch (locale) {
    case "ru":
      antLocale = ruLocale
      break
    case "kz":
      antLocale = kzLocale
      break
    default:
      console.error(`Unknown locale for ${AntConfigProvider.name}: "${locale}"`)
      antLocale = undefined
  }

  return <ConfigProvider locale={antLocale} {...restProps} />
}
