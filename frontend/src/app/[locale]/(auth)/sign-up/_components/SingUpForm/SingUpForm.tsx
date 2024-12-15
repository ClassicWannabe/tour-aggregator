"use client"
import React from "react"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import Form from "next/form"
import CustomInput from "@/components/CustomInput/CustomInput"
import { PlusIcon } from "lucide-react"
import CustomCheckbox from "@/components/CustomCheckbox"

export default function SingUpForm() {
  const sT = useTranslations("Shared")
  const t = useTranslations("SignUpPage")

  return (
    <Form action={() => {}} className="flex-col flex gap-3">
      <Tabs defaultValue="tourAgency" className="w-full flex flex-col gap-3">
        <TabsList className="w-full">
          <TabsTrigger value="tourAgency">{sT("tourAgency")}</TabsTrigger>
          <TabsTrigger value="tourGuide">{sT("tourGuide")}</TabsTrigger>
        </TabsList>
        <CustomInput id="email-input" label={sT("email")} placeholder={sT("email")} type="email" />
        <TabsContent value="tourAgency" className="flex flex-col gap-3 mt-0">
          <CustomInput id="company-name" label={t("companyName")} placeholder={t("companyName")} type="text" />
          <CustomInput id="owner-full-name" label={t("ownerFullName")} placeholder={t("ownerFullName")} type="text" />
        </TabsContent>
        <TabsContent value="tourGuide" className="flex flex-col gap-3 mt-0">
          <CustomInput id="guide-name" label={t("name")} placeholder={t("name")} type="text" />
          <CustomInput id="guide-surname" label={t("surname")} placeholder={t("surname")} type="text" />
        </TabsContent>
        <CustomInput id="password-input" label={sT("password")} placeholder={sT("password")} type="password" />
        <CustomInput
          id="password-confirm-input"
          label={t("confirmPassword")}
          placeholder={t("confirmPassword")}
          type="password"
        />
        <CustomInput id="resources-links" label={t("resourcesLinks")} placeholder={t("resourcesLinks")} type="text" />
        <Button
          className="w-fit px-1 text-body2 flex items-center gap-1"
          type="button"
          variant="outlined"
          color="secondary"
          size="sm"
        >
          <PlusIcon size={14} />
          {t("addOtherLink")}
        </Button>
        <CustomCheckbox label={t("agreeToTermPolicy")} />
        <CustomCheckbox label={t("agreeToReceiveUpdates")} />
      </Tabs>
      <Button className="w-full" type="submit">
        <Typography as="span" variant="body1">
          {t("createAccount")}
        </Typography>
      </Button>
    </Form>
  )
}
