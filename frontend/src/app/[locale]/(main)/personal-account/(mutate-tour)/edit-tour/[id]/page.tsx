import { getTranslations, setRequestLocale } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import { fetchLocations } from "@/actions/fetch-locations"
import getTour from "@/actions/get-tour"
import { getTourFormDefaultValues } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/utils"
import { MutateTourForm } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/MutateTourForm/MutateTourForm"

export default async function EditTourPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  const t = await getTranslations("EditTourPage")
  setRequestLocale(locale)
  const locations = await fetchLocations()
  const tour = await getTour(id)
  const formDefaultValues = getTourFormDefaultValues(tour)

  return (
    <div>
      <Typography variant="headline1">{t("title")}</Typography>
      <MutateTourForm locations={locations} editDetails={{ initialForm: formDefaultValues, tourId: id }} />
    </div>
  )
}
