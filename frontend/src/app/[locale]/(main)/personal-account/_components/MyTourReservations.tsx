import { getTranslations } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import { Tabs, TabsContent } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { SearchParams } from "next/dist/server/request/search-params"
import MyToursTabsTriggers from "@/app/[locale]/(main)/personal-account/_components/MyToursTabsTriggers"
import { TourStatus } from "@/lib/interfaces/tours"
import { MY_TOUR_RESERVATIONS_SEARCH_PARAMS } from "@/lib/consts/personal-account"
import { TourReservationTable } from "@/app/[locale]/(main)/personal-account/_components/Table/TourReservationTable"
import MyTourReservationsTabsTriggers from "@/app/[locale]/(main)/personal-account/_components/MyTourReservationsTabsTriggers"

type MyTourReservationsProps = {
  searchParams: SearchParams
}
export default async function MyTourReservations({ searchParams }: MyTourReservationsProps) {
  const t = await getTranslations("MyTourReservations")
  const status = searchParams[MY_TOUR_RESERVATIONS_SEARCH_PARAMS.tourStatus]

  return (
    <>
      <Typography variant="headline4">{t("title")}</Typography>

      <Tabs
        defaultValue="allReservations"
        value={(status as string) ?? "allReservations"}
        className="flex w-full flex-col gap-3"
      >
        <MyTourReservationsTabsTriggers searchParams={searchParams} />
        <TabsContent value="allReservations" className="mt-0 flex flex-col gap-3">
          <TourReservationTable searchParams={searchParams} />
        </TabsContent>
        <TabsContent value={TourStatus.ACTIVE} className="mt-0 flex flex-col gap-3">
          <TourReservationTable searchParams={searchParams} />
        </TabsContent>
        <TabsContent value={TourStatus.FINISHED} className="mt-0 flex flex-col gap-3">
          <TourReservationTable searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </>
  )
}
