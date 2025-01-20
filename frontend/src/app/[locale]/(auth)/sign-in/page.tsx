import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/routing"
import GuestFormWrapper from "@/app/[locale]/(auth)/_components/GuestFormWrapper"
import SingInForm from "@/app/[locale]/(auth)/sign-in/_components/SingInForm"
import RouteNames from "@/lib/consts/route-names"

export default async function SignIn({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("AuthPage")
  setRequestLocale(locale)
  return (
    <section className="h-full flex justify-center items-center">
      <GuestFormWrapper title={t("enterAccountTitle")}>
        <SingInForm />
        <div className="flex gap-1 justify-center">
          <p className="text-body2">{t("noAccount")}</p>
          <Link href={RouteNames.SignUp} className="text-body2 text-primaryGreen">
            {t("signUp")}
          </Link>
        </div>
      </GuestFormWrapper>
    </section>
  )
}
