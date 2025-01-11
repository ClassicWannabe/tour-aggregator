"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"

export default function MobileFooter() {
  const sT = useTranslations("Shared")
  const t = useTranslations("Footer")

  return (
    <div className="main-layout-padding-horizontal py-6 flex flex-col bg-colorBgLayout">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="support">
          <AccordionTrigger>
            <h5 className="text-headline5">{sT("support")}</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p className="text-body2 cursor-pointer">Telegram</p>
              <p className="text-body2 cursor-pointer">WhatsApp</p>
              <p className="text-body2 cursor-pointer">support@mail.ru</p>
              <div className="flex gap-1">
                <Image alt="green phone" src="/static/icons/phone.svg" width={16} height={16} />
                <p className="text-body2">+7 777 001-01-01</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="toTravellers">
          <AccordionTrigger>
            <h5 className="text-headline5">{sT("toTravellers")}</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p className="text-body2 cursor-pointer">{t("faq")}</p>
              <p className="text-body2 cursor-pointer">{t("userConditions")}</p>
              <p className="text-body2 cursor-pointer">{t("refundPolicy")}</p>
              <p className="text-body2 cursor-pointer">{t("paymentsSafety")}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="toGuides">
          <AccordionTrigger>
            <h5 className="text-headline5">{t("toGuides")}</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p className="text-body2 cursor-pointer">{t("becomeGuide")}</p>
              <p className="text-body2 cursor-pointer">{t("faq")}</p>
              <p className="text-body2 cursor-pointer">{t("operatingRules")}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="becomePartner">
          <AccordionTrigger>
            <h5 className="text-headline5">{sT("toPartners")}</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p className="text-body2 cursor-pointer">{t("becomePartner")}</p>
              <p className="text-body2 cursor-pointer">{t("partnerCabinet")}</p>
              <p className="text-body2 cursor-pointer">{t("docs")}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
