import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Locale, routing } from "@/i18n/routing"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertNumberInPriceFormat(initialNumber: string | number, toFixed?: number) {
  if (initialNumber === undefined || initialNumber === null) return initialNumber

  let number: number = typeof initialNumber === "number" ? initialNumber : parseFloat(initialNumber)

  if (isNaN(number)) return initialNumber

  if (toFixed !== undefined) {
    number = parseFloat(number.toFixed(toFixed))
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export function formatDateToCustomString(isoDate: string, locale: string = "ru") {
  const locales = {
    ru: {
      months: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
      days: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    },
    kz: {
      months: [
        "Қаңтар",
        "Ақпан",
        "Наурыз",
        "Сәуір",
        "Мамыр",
        "Маусым",
        "Шілде",
        "Тамыз",
        "Қыркүйек",
        "Қазан",
        "Қараша",
        "Желтоқсан",
      ],
      days: ["жс", "дс", "сс", "ср", "бс", "жм", "сб"],
    },
    en: {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
  }
  if (!isoDate) {
    return ""
  }

  const selectedLocale = locales[locale as keyof typeof locales] || locales["ru"]
  const { months, days } = selectedLocale

  const date = new Date(isoDate)

  const dayOfWeek = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${dayOfWeek}, ${day} ${month} в ${hours}:${minutes}`
}

export function isLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale)
}
