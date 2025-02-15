"use client"
import React, { useActionState } from "react"
import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import CustomInput from "@/components/CustomInput/CustomInput"
import CustomCheckbox from "@/components/CustomCheckbox"
import { signUp } from "@/app/[locale]/(auth)/sign-up/_components/SingUpForm/actions"
import useFormErrorsTranslation from "@/lib/hooks/useFormErrorsTranslation"

const SignUpInitialState = {
  payload: {
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    companyName: "",
    ownerName: "",
    agreeToTermPolicy: "off",
  },
  errors: {},
}

export default function SingUpForm() {
  const [state, actionState, pending] = useActionState(signUp, SignUpInitialState)
  const t = useTranslations()
  const getErrorsTranslation = useFormErrorsTranslation()

  console.log(state.payload)

  return (
    <form action={actionState} className="flex-col flex gap-3">
      <Tabs defaultValue="tourAgency" className="w-full flex flex-col gap-3">
        <TabsList className="w-full">
          <TabsTrigger value="tourAgency">{t("Shared.tourAgency")}</TabsTrigger>
          <TabsTrigger value="tourGuide">{t("Shared.tourGuide")}</TabsTrigger>
        </TabsList>
        <CustomInput
          id="email-input"
          label={t("Shared.email")}
          placeholder={t("Shared.email")}
          type="email"
          name="email"
          defaultValue={state?.payload.email as string}
          errorText={getErrorsTranslation(state?.errors?.email)}
        />
        <CustomInput
          id="phone-input"
          label={t("Shared.phone")}
          placeholder={t("Shared.phone")}
          type="text"
          name="phone"
          defaultValue={state?.payload.phone as string}
          errorText={getErrorsTranslation(state?.errors?.phone)}
        />
        <TabsContent value="tourAgency" className="flex flex-col gap-3 mt-0">
          <CustomInput
            id="company-name"
            label={t("SignUpPage.companyName")}
            placeholder={t("SignUpPage.companyName")}
            type="text"
            name="companyName"
            defaultValue={state?.payload.companyName as string}
            errorText={getErrorsTranslation(state?.errors?.companyName)}
            required
          />
          <CustomInput
            id="owner-full-name"
            label={t("SignUpPage.ownerFullName")}
            placeholder={t("SignUpPage.ownerFullName")}
            type="text"
            name="ownerName"
            defaultValue={state?.payload.ownerName as string}
            errorText={getErrorsTranslation(state?.errors?.ownerName)}
            required
          />
        </TabsContent>
        <TabsContent value="tourGuide" className="flex flex-col gap-3 mt-0">
          <CustomInput
            id="guide-name"
            label={t("SignUpPage.name")}
            placeholder={t("SignUpPage.name")}
            type="text"
            name="firstName"
            defaultValue={state?.payload.firstName as string}
            errorText={getErrorsTranslation(state?.errors?.firstName)}
            required
          />
          <CustomInput
            id="guide-surname"
            label={t("SignUpPage.surname")}
            placeholder={t("SignUpPage.surname")}
            type="text"
            name="lastName"
            defaultValue={state?.payload.lastName as string}
            errorText={getErrorsTranslation(state?.errors?.lastName)}
            required
          />
        </TabsContent>
        <CustomInput
          id="password-input"
          label={t("Shared.password")}
          placeholder={t("Shared.password")}
          type="password"
          name="password"
          defaultValue={state?.payload.password as string}
          errorText={getErrorsTranslation(state?.errors?.password)}
          required
        />
        <CustomInput
          id="password-confirm-input"
          label={t("SignUpPage.confirmPassword")}
          placeholder={t("SignUpPage.confirmPassword")}
          type="password"
          name="confirmPassword"
          defaultValue={state?.payload.confirmPassword as string}
          errorText={getErrorsTranslation(state?.errors?.confirmPassword)}
          required
        />
        {/*<CustomInput*/}
        {/*  id="resources-links"*/}
        {/*  label={t("SignUpPage.resourcesLinks")}*/}
        {/*  placeholder={t("SignUpPage.resourcesLinks")}*/}
        {/*  type="text"*/}
        {/*  name="socialLinks"*/}
        {/*  errorText={getErrorsTranslation(state?.errors?.socialLinks)}*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  className="w-fit px-1 text-body2 flex items-center gap-1"*/}
        {/*  type="button"*/}
        {/*  variant="outlined"*/}
        {/*  color="secondary"*/}
        {/*  size="sm"*/}
        {/*>*/}
        {/*  <PlusIcon size={14} />*/}
        {/*  {t("SignUpPage.addOtherLink")}*/}
        {/*</Button>*/}
        <CustomCheckbox
          label={t("SignUpPage.agreeToTermPolicy")}
          id="agreeToTermPolicy"
          name="agreeToTermPolicy"
          defaultChecked={state?.payload.agreeToTermPolicy === "on"}
          errorText={getErrorsTranslation(state?.errors?.agreeToTermPolicy)}
        />
        <CustomCheckbox
          label={t("SignUpPage.agreeToReceiveUpdates")}
          id="agreeToReceiveUpdates"
          name="agreeToReceiveUpdates"
          defaultChecked={state?.payload.agreeToReceiveUpdates === "on"}
        />
      </Tabs>
      <Button className="w-full text-body1 text-primaryWhite" type="submit" disabled={pending}>
        {t("SignUpPage.createAccount")}
      </Button>
    </form>
  )
}
