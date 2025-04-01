"use client"
import { Check } from "lucide-react"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { useRouter } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { useTranslations } from "next-intl"

export default function SuccessStatus() {
  const t = useTranslations("VerifyEmail")
  const router = useRouter()

  const handleRedirect = async () => {
    router.replace(RouteNames.PersonalAccount)
  }

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
      <Check className="h-14 w-14 rounded-full bg-primaryGreen p-3 text-primaryWhite" />
      <Typography variant="headline2">{t("successText")}</Typography>
      <Button type="button" onClick={handleRedirect}>
        {t("redirectSignInButton")}
      </Button>
    </div>
  )
}
