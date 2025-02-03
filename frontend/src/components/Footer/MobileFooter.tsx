"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"

export default function MobileFooter() {
  const t = useTranslations()

  return (
    <div className="main-layout-padding-horizontal py-6 flex flex-col bg-colorBgLayout">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="support">
          <AccordionTrigger>
            <h5 className="text-headline5">{t("Shared.support")}</h5>
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
            <h5 className="text-headline5">{t("Shared.toTravellers")}</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p className="text-body2 cursor-pointer">{t("Footer.faq")}</p>
              <p className="text-body2 cursor-pointer">{t("Footer.userConditions")}</p>
              <p className="text-body2 cursor-pointer">{t("Footer.refundPolicy")}</p>
              <p className="text-body2 cursor-pointer">{t("Footer.paymentsSafety")}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="toGuides">
          <AccordionTrigger>
            <h5 className="text-headline5">{t("Footer.toGuides")}</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p className="text-body2 cursor-pointer">{t("Footer.becomeGuide")}</p>
              <p className="text-body2 cursor-pointer">{t("Footer.faq")}</p>
              <p className="text-body2 cursor-pointer">{t("Footer.operatingRules")}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="becomePartner">
          <AccordionTrigger>
            <h5 className="text-headline5">{t("Shared.toPartners")}</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p className="text-body2 cursor-pointer">{t("Footer.becomePartner")}</p>
              <p className="text-body2 cursor-pointer">{t("Footer.partnerCabinet")}</p>
              <p className="text-body2 cursor-pointer">{t("Footer.docs")}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
