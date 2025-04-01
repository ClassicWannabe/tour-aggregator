"use client"
import { X } from "lucide-react"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { sendEmailVerification } from "@/actions/send-email-verification"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

type ErrorStatusProps = {
  email: string
}
export default function ErrorStatus({ email }: ErrorStatusProps) {
  const t = useTranslations("VerifyEmail")
  const [timer, setTimer] = useState(0)
  const [btnDisabled, setBtnDisabled] = useState(false)

  const handleResendButton = async () => {
    const { error } = await sendEmailVerification(email)
    if (error) {
      setBtnDisabled(true)
      return
    }

    setTimer(60)
  }

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer((prev) => prev - 1), 1000)
    }
  }, [timer])

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
      <X className="h-14 w-14 rounded-full bg-destructive p-3 text-primaryWhite" />
      <Typography variant="headline2">{t("errorText")}</Typography>
      <Button type="button" onClick={handleResendButton} disabled={timer > 0 || btnDisabled}>
        {t("resendVerifyEmailButton")}
      </Button>
      {timer > 0 && <span className="text-gray-500">{timer}</span>}
    </div>
  )
}
