import { getTranslations, setRequestLocale } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import { fetchLocations } from "@/actions/fetch-locations"
import getTour from "@/actions/get-tour"
import { getTourFormDefaultValues } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/utils"
import { CreateTourForm } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/CreateTourForm"

export default async function CreateTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("CreateTourPage")
  setRequestLocale(locale)
  const locations = await fetchLocations()

  return (
    <div>
      <Typography variant="headline1">{t("title")}</Typography>
      <CreateTourForm locations={locations} />
    </div>
  )
}
