import { getTranslations, setRequestLocale } from "next-intl/server"
import Typography from "@/components/ui/Typography"
import { Link } from "@/i18n/routing"
import GuestFormWrapper from "@/app/[locale]/(auth)/_components/GuestFormWrapper"
import SingUpForm from "@/app/[locale]/(auth)/sign-up/_components/SingUpForm"

export default async function SignIn({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("SignUpPage")
  setRequestLocale(locale)
  return (
    <section className="h-full flex justify-center items-center">
      <GuestFormWrapper title={t("createAccount")}>
        <SingUpForm />
        <div className="flex gap-1 justify-center">
          <Typography as="p" variant="body2">
            {t("accountExist")}
          </Typography>
          <Link href="/sign-in" className="text-body2 txext-primaryGreen">
            {t("entry")}
          </Link>
        </div>
      </GuestFormWrapper>
    </section>
  )
}
