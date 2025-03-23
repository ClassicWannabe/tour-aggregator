import { getTranslations, setRequestLocale } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import { CreateTourForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/CreateTourForm"
import { fetchLocations } from "@/actions/fetch-locations"

export default async function CreateTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("CreateTourPage")
  setRequestLocale(locale)
  const locations = await fetchLocations()

  return (
    <div className="bg-colorBgLayout">
      <Typography variant="headline1">{t("title")}</Typography>
      <CreateTourForm locations={locations} />
    </div>
  )
}
