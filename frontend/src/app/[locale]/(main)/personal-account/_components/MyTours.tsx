import { getTranslations } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent } from "@/components/ui/Tabs/Tabs"
import React from "react"
import { TourTable } from "@/app/[locale]/(main)/personal-account/_components/TourTable"
import { SearchParams } from "next/dist/server/request/search-params"
import MyToursTabsTriggers from "@/app/[locale]/(main)/personal-account/_components/MyToursTabsTriggers"
import { TourStatus } from "@/lib/interfaces/tours"

type MyToursProps = {
  searchParams: SearchParams
}
export default async function MyTours({ searchParams }: MyToursProps) {
  const t = await getTranslations("MyTours")
  const { status } = searchParams

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Typography variant="headline4">{t("title")}</Typography>
        <Button className="flex flex-row justify-evenly">
          <Plus />
          <span>{t("createTour")}</span>
        </Button>
      </div>

      <Tabs defaultValue={(status as string) ?? "allTours"} className="w-full flex flex-col gap-3">
        <MyToursTabsTriggers />
        <TabsContent value="allTours" className="flex flex-col gap-3 mt-0">
          <TourTable searchParams={searchParams} />
        </TabsContent>
        <TabsContent value={TourStatus.ACTIVE} className="flex flex-col gap-3 mt-0">
          <TourTable searchParams={searchParams} />
        </TabsContent>
        <TabsContent value={TourStatus.FINISHED} className="flex flex-col gap-3 mt-0">
          <TourTable searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </>
  )
}
