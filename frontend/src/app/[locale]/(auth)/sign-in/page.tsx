import Button from "../../../../components/ui/Button"
import GuestFormWrapper from "@/app/[locale]/(auth)/components/GuestFormWrapper"
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function SignIn({ params }: { params: { locale: string } }) {
  const { locale } = await params
  const t = await getTranslations("AuthPage")
  setRequestLocale(locale)
  return (
    <section className="h-full flex justify-center items-center">
      <GuestFormWrapper title={t("enterAccount")}>
        <Button>btn</Button>
        <Button color="secondary" variant="filled">
          btn
        </Button>
      </GuestFormWrapper>
    </section>
  )
}
