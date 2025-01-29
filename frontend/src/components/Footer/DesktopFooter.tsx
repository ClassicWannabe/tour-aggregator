"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function DesktopFooter() {
  const t = useTranslations()

  return (
    <div className="main-layout-padding-horizontal py-8 flex justify-between bg-colorBgLayout">
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{t("Shared.support")}</h5>
        <p className="text-body2 cursor-pointer">Telegram</p>
        <p className="text-body2 cursor-pointer">WhatsApp</p>
        <p className="text-body2 cursor-pointer">support@mail.ru</p>
        <div className="flex gap-1">
          <Image alt="green phone" src="/static/icons/phone.svg" width={16} height={16} />
          <p className="text-body2">+7 777 001-01-01</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{t("Shared.toTravellers")}</h5>
        <p className="text-body2 cursor-pointer">{t("Footer.faq")}</p>
        <p className="text-body2 cursor-pointer">{t("Footer.userConditions")}</p>
        <p className="text-body2 cursor-pointer">{t("Footer.refundPolicy")}</p>
        <p className="text-body2 cursor-pointer">{t("Footer.paymentsSafety")}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{t("Footer.toGuides")}</h5>
        <p className="text-body2 cursor-pointer">{t("Footer.becomeGuide")}</p>
        <p className="text-body2 cursor-pointer">{t("Footer.faq")}</p>
        <p className="text-body2 cursor-pointer">{t("Footer.operatingRules")}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="text-headline5">{t("Shared.toPartners")}</h5>
        <p className="text-body2 cursor-pointer">{t("Footer.becomePartner")}</p>
        <p className="text-body2 cursor-pointer">{t("Footer.partnerCabinet")}</p>
        <p className="text-body2 cursor-pointer">{t("Footer.docs")}</p>
      </div>
    </div>
  )
}
