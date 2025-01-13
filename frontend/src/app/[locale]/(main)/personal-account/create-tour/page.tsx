import { getTranslations, setRequestLocale } from "next-intl/server"
import CreateTourForm from "@/app/[locale]/(main)/personal-account/create-tour/_components/CreateTourForm"
import Typography from "@/components/ui/Typography"

export default async function CreateTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("CreateTourPage")
  setRequestLocale(locale)

  return (
    <>
      <Typography variant="headline1">{t("title")}</Typography>
      <CreateTourForm />
    </>
  )
}
