import { getTranslations, setRequestLocale } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import { Link } from "@/i18n/routing"
import GuestFormWrapper from "@/app/[locale]/(auth)/_components/GuestFormWrapper"
import SingInForm from "@/app/[locale]/(auth)/_components/SingInForm"

export default async function SignIn({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("AuthPage")
  setRequestLocale(locale)
  return (
    <section className="h-full flex justify-center items-center">
      <GuestFormWrapper title={t("enterAccountTitle")}>
        <SingInForm />
        <div className="flex gap-1 justify-center">
          <Typography as="p" variant="body2">
            {t("noAccount")}
          </Typography>
          <Link href="/sign-ip" className="text-body2 text-primaryGreen">
            {t("signUp")}
          </Link>
        </div>
      </GuestFormWrapper>
    </section>
  )
}
