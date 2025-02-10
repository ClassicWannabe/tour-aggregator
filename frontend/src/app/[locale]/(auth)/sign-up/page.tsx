import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/routing"
import GuestFormWrapper from "@/app/[locale]/(auth)/_components/GuestFormWrapper"
import SingUpForm from "@/app/[locale]/(auth)/sign-up/_components/SingUpForm"
import RouteNames from "@/lib/consts/route-names"

export default async function SignUp({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("SignUpPage")
  setRequestLocale(locale)
  return (
    <section className="h-full flex justify-center items-center">
      <GuestFormWrapper title={t("createAccount")}>
        <SingUpForm />
        <div className="flex gap-1 justify-center">
          <p className="text-body2 text-primaryBlack">{t("accountExist")}</p>
          <Link href={RouteNames.SignIn} className="text-body2 text-primaryGreen">
            {t("entry")}
          </Link>
        </div>
      </GuestFormWrapper>
    </section>
  )
}
