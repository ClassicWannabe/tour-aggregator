import { getTranslations, setRequestLocale } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import { fetchLocations } from "@/actions/fetch-locations"
import { MutateTourForm } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/MutateTourForm/MutateTourForm"

export default async function CreateTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("CreateTourPage")
  setRequestLocale(locale)
  const locations = await fetchLocations()

  return (
    <div>
      <Typography variant="headline1">{t("title")}</Typography>
      <MutateTourForm locations={locations} />
    </div>
  )
}
