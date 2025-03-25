"use client"
import { useTranslations } from "next-intl"
import React, { useActionState } from "react"
import useFormErrorsTranslation from "@/lib/hooks/useFormErrorsTranslation"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"
import CustomInput from "@/components/CustomInput/CustomInput"
import CustomTextarea from "@/components/CustomTextarea/CustomTextarea"
import SupplierPhotoForm from "@/app/[locale]/(main)/personal-account/_components/ProfileForm/SupplierPhotoForm"
import { Supplier, SupplierType } from "@/lib/interfaces/suppliers"
import { getProfileFormInitial } from "@/app/[locale]/(main)/personal-account/_components/ProfileForm/utils"
import { updateProfile } from "@/app/[locale]/(main)/personal-account/_components/ProfileForm/actions"

type ProfileFormProps = {
  supplier: Supplier
}

export function ProfileForm({ supplier }: ProfileFormProps) {
  const t = useTranslations()
  const initialForm = getProfileFormInitial(supplier)
  const [state, actionState, pending] = useActionState(updateProfile, initialForm)
  const getErrorsTranslation = useFormErrorsTranslation()

  return (
    <form action={actionState} className="flex-col flex gap-3">
      <div className="flex flex-row justify-between">
        <div>
          <Typography variant="headline2">{t("ProfileForm.title")}</Typography>
          <Typography>{t("ProfileForm.description")}</Typography>
        </div>
        <Button color="secondary" variant="outlined" disabled={pending}>
          {t("ProfileForm.editButton")}
        </Button>
      </div>
      <Separator />
      <Typography variant="headline4">{t("ProfileForm.mainInformation.title")}</Typography>
      <SupplierPhotoForm photo={supplier.photo} />
      <div className="grid lg:grid-cols-2 lg:gap-x-6 gap-y-10">
        {supplier.type === SupplierType.COMPANY_SUPPLIER ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}

        <CustomInput
          id="email-input"
          label={t("Shared.email")}
          placeholder={t("Shared.email")}
          type="email"
          name="email"
          defaultValue={state?.payload.email as string}
          errorText={getErrorsTranslation(state?.errors?.email)}
          required
        />
        <CustomInput
          id="phone-input"
          label={t("Shared.phone")}
          placeholder={t("Shared.phone")}
          type="text"
          name="phone"
          defaultValue={state?.payload.phone as string}
          errorText={getErrorsTranslation(state?.errors?.phone)}
          required
        />
        <CustomTextarea
          id="about-me-input"
          label={t("Shared.aboutMe")}
          placeholder={t("Shared.aboutMe")}
          name="aboutMe"
          defaultValue={state?.payload.aboutMe as string}
          errorText={getErrorsTranslation(state?.errors?.aboutMe)}
          className="col-span-2"
          rows={4}
        />
      </div>
      <Separator />
      <Typography variant="headline4">{t("ProfileForm.certificate.title")}</Typography>
    </form>
  )
}
