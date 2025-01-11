"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function DesktopFooter() {
  const sT = useTranslations("Shared")
  const t = useTranslations("Footer")

  return (
    <div className="main-layout-padding-horizontal py-8 flex justify-between bg-colorBgLayout">
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{sT("support")}</h5>
        <p className="text-body2 cursor-pointer">Telegram</p>
        <p className="text-body2 cursor-pointer">WhatsApp</p>
        <p className="text-body2 cursor-pointer">support@mail.ru</p>
        <div className="flex gap-1">
          <Image alt="green phone" src="/static/icons/phone.svg" width={16} height={16} />
          <p className="text-body2">+7 777 001-01-01</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{sT("toTravellers")}</h5>
        <p className="text-body2 cursor-pointer">{t("faq")}</p>
        <p className="text-body2 cursor-pointer">{t("userConditions")}</p>
        <p className="text-body2 cursor-pointer">{t("refundPolicy")}</p>
        <p className="text-body2 cursor-pointer">{t("paymentsSafety")}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{t("toGuides")}</h5>
        <p className="text-body2 cursor-pointer">{t("becomeGuide")}</p>
        <p className="text-body2 cursor-pointer">{t("faq")}</p>
        <p className="text-body2 cursor-pointer">{t("operatingRules")}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{sT("toPartners")}</h5>
        <p className="text-body2 cursor-pointer">{t("becomePartner")}</p>
        <p className="text-body2 cursor-pointer">{t("partnerCabinet")}</p>
        <p className="text-body2 cursor-pointer">{t("docs")}</p>
      </div>
    </div>
  )
}
