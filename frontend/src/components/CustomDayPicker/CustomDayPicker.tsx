"use client"

import React, { useState } from "react"
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns"
import { ru, enUS, kk } from "date-fns/locale"
import { useLocale } from "next-intl"
import Button from "@/components/ui/Button"
import { EN_WEEKDAYS, KZ_WEEKDAYS, RU_WEEKDAYS } from "@/lib/consts/dates"
import { Tour } from "@/lib/interfaces/tours"
import { cn } from "@/lib/utils/common"

const busyDays = [new Date(2024, 8, 25)] // Example: September 25, 2024 (Month index starts at 0)

const WeekDays = {
  en: EN_WEEKDAYS,
  ru: RU_WEEKDAYS,
  kz: KZ_WEEKDAYS,
}

const FNS_Locale = {
  en: enUS,
  ru: ru,
  kz: kk,
}

type Props = {
  dates: Tour["dates"]
}

export default function CustomDayPicker({ dates }: Props) {
  const locale = useLocale()
  const [currentMonth, setCurrentMonth] = useState(() =>
    !!dates.length && dates[0].startDate ? new Date(dates[0].startDate) : new Date(),
  )

  const startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 })
  const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  const tourStartDates = !!dates.length ? dates.map((date) => new Date(date.startDate)) : []

  return (
    <div className="w-80 rounded-lg border bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</Button>
        <h2 className="text-lg font-bold">
          {format(currentMonth, "LLLL yyyy", { locale: FNS_Locale[locale as keyof typeof FNS_Locale] || ru })}
        </h2>
        <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</Button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center text-gray-600">
        {WeekDays[(locale as keyof typeof WeekDays) || "ru"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isTourFull = busyDays.some((d) => isSameDay(d, day))
          const isTourDay = tourStartDates.some((d) => isSameDay(d, day))
          const isCurrentMonth = isSameMonth(day, currentMonth)

          return (
            <div
              key={day.toString()}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md",
                isTourFull && "bg-red-400 text-white",
                isTourDay && "bg-primaryGreen text-white",
                isCurrentMonth ? "text-black" : "text-gray-400",
              )}
            >
              {format(day, "d")}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 bg-red-400" /> День занят
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 bg-primaryGreen" /> День свободен
        </div>
      </div>
    </div>
  )
}
