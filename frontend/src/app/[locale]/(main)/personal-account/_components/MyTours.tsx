import { getTranslations } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { SearchParams } from "next/dist/server/request/search-params"
import MyToursTabsTriggers from "@/app/[locale]/(main)/personal-account/_components/MyToursTabsTriggers"
import { TourStatus } from "@/lib/interfaces/tours"
import { Link } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { TourTable } from "@/app/[locale]/(main)/personal-account/_components/Table/TourTable"
import { MY_TOURS_SEARCH_PARAMS } from "@/lib/consts/personal-account"

type MyToursProps = {
  searchParams: SearchParams
}
export default async function MyTours({ searchParams }: MyToursProps) {
  const t = await getTranslations("MyTours")
  const status = searchParams[MY_TOURS_SEARCH_PARAMS.tourStatus]

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Typography variant="headline4">{t("title")}</Typography>
        <Link href={RouteNames.CreateTour}>
          <Button className="flex flex-row justify-evenly">
            <Plus />
            <span>{t("createTour")}</span>
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="allTours" value={(status as string) ?? "allTours"} className="flex w-full flex-col gap-3">
        <MyToursTabsTriggers searchParams={searchParams} />
        <TabsContent value="allTours" className="mt-0 flex flex-col gap-3">
          <TourTable searchParams={searchParams} />
        </TabsContent>
        <TabsContent value={TourStatus.ACTIVE} className="mt-0 flex flex-col gap-3">
          <TourTable searchParams={searchParams} />
        </TabsContent>
        <TabsContent value={TourStatus.FINISHED} className="mt-0 flex flex-col gap-3">
          <TourTable searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </>
  )
}
