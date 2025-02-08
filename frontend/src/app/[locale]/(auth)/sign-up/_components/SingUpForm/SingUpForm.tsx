"use client"
import React, { useActionState } from "react"
import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import Form from "next/form"
import CustomInput from "@/components/CustomInput/CustomInput"
import { PlusIcon } from "lucide-react"
import CustomCheckbox from "@/components/CustomCheckbox"

export default function SingUpForm() {
  const t = useTranslations()
  const [state, formAction] = useActionState(increment, 0)

  return (
    <Form action={() => {}} className="flex-col flex gap-3">
      <Tabs defaultValue="tourAgency" className="w-full flex flex-col gap-3">
        <TabsList className="w-full">
          <TabsTrigger value="tourAgency">{t("Shared.tourAgency")}</TabsTrigger>
          <TabsTrigger value="tourGuide">{t("Shared.tourGuide")}</TabsTrigger>
        </TabsList>
        <CustomInput id="email-input" label={t("Shared.email")} placeholder={t("Shared.email")} type="email" />
        <TabsContent value="tourAgency" className="flex flex-col gap-3 mt-0">
          <CustomInput
            id="company-name"
            label={t("SignUpPage.companyName")}
            placeholder={t("SignUpPage.companyName")}
            type="text"
          />
          <CustomInput
            id="owner-full-name"
            label={t("SignUpPage.ownerFullName")}
            placeholder={t("SignUpPage.ownerFullName")}
            type="text"
          />
        </TabsContent>
        <TabsContent value="tourGuide" className="flex flex-col gap-3 mt-0">
          <CustomInput id="guide-name" label={t("SignUpPage.name")} placeholder={t("SignUpPage.name")} type="text" />
          <CustomInput
            id="guide-surname"
            label={t("SignUpPage.surname")}
            placeholder={t("SignUpPage.surname")}
            type="text"
          />
        </TabsContent>
        <CustomInput
          id="password-input"
          label={t("Shared.password")}
          placeholder={t("Shared.password")}
          type="password"
        />
        <CustomInput
          id="password-confirm-input"
          label={t("SignUpPage.confirmPassword")}
          placeholder={t("SignUpPage.confirmPassword")}
          type="password"
        />
        <CustomInput
          id="resources-links"
          label={t("SignUpPage.resourcesLinks")}
          placeholder={t("SignUpPage.resourcesLinks")}
          type="text"
        />
        <Button
          className="w-fit px-1 text-body2 flex items-center gap-1"
          type="button"
          variant="outlined"
          color="secondary"
          size="sm"
        >
          <PlusIcon size={14} />
          {t("SignUpPage.addOtherLink")}
        </Button>
        <CustomCheckbox label={t("SignUpPage.agreeToTermPolicy")} />
        <CustomCheckbox label={t("SignUpPage.agreeToReceiveUpdates")} />
      </Tabs>
      <Button className="w-full text-body1 text-primaryWhite" type="submit">
        {t("SignUpPage.createAccount")}
      </Button>
    </Form>
  )
}
