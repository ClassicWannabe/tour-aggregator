"use client"
import { useTranslations } from "next-intl"
import FormInput from "@/components/Form/FormInput"
import { useFormContext } from "react-hook-form"
import React, { useCallback, useEffect, useMemo } from "react"
import dayjs from "dayjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import FormTitle from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/FormTitle"
import { DayProgramInputs } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/TourProgramForm/DayProgramInputs"
import { MainInformationFormType } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/MainInformationForm"

export function TourProgramForm() {
  const t = useTranslations("TourProgramForm")
  const { watch, getValues, setValue } = useFormContext()
  const dateRange: Required<MainInformationFormType["dateRange"]> = watch("dateRange")
  const getNumberOfDays = useCallback(() => {
    const startDate = dayjs(dateRange.startDate)
    const endDate = dayjs(dateRange.endDate)
    const diff = endDate.diff(startDate, "day", true)
    return Math.ceil(diff)
  }, [dateRange])
  const numberOfDays = useMemo(() => getNumberOfDays(), [getNumberOfDays])
  const numberOfDaysArr = Array.from({ length: numberOfDays }, (_, i) => i + 1)

  const rebalanceTourProgram = useCallback(() => {
    const tourProgram: object[][] = getValues("tourProgram")
    if (tourProgram.length > numberOfDays) {
      setValue("tourProgram", tourProgram.slice(0, numberOfDays))
    } else if (tourProgram.length < numberOfDays) {
      const diff = numberOfDays - tourProgram.length
      const additionalInputs = []

      for (let i = 0; i < diff; i++) {
        additionalInputs.push([
          { time: undefined, description: "" },
          { time: undefined, description: "" },
        ])
      }
      setValue("tourProgram", [...tourProgram, ...additionalInputs])
    }
  }, [getValues, numberOfDays, setValue])

  useEffect(() => {
    rebalanceTourProgram()
  }, [rebalanceTourProgram])

  return (
    <>
      <FormTitle title={t("title1")} subtitle={t("subtitle1")} />
      <Tabs defaultValue="1">
        <TabsList>
          {numberOfDaysArr.map((day) => {
            return (
              <TabsTrigger key={"tabs-list" + day} value={day.toString()}>
                {t("tabsList", { day })}
              </TabsTrigger>
            )
          })}
        </TabsList>
        {numberOfDaysArr.map((day) => {
          return (
            <TabsContent key={"tabs-content" + day} value={day.toString()}>
              <DayProgramInputs dayIndex={day - 1} />
            </TabsContent>
          )
        })}
      </Tabs>

      <FormTitle title={t("title2")} subtitle={t("subtitle2")} />
      <FormInput
        name="meetinPlace"
        label={t("input.meetingPlace.label")}
        inputProps={{ placeholder: t("input.meetingPlace.placeholder") }}
      />
    </>
  )
}
