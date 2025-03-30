"use client"
import React, { useActionState } from "react"
import Button from "@/components/ui/Button"
import CustomInput from "@/components/CustomInput/CustomInput"
import { signIn } from "../../../../../../actions/sign-in"
import useFormErrorsTranslation from "@/lib/hooks/useFormErrorsTranslation"
import { useTranslations } from "next-intl"
import FormErrorText from "@/components/ui/FormErrorText"
import Spinner from "@/components/ui/Spinner"

const SignInFormInitial = {
  payload: {
    email: "",
    password: "",
  },
  errors: {},
}

export default function SignInForm() {
  const t = useTranslations()
  const [state, actionState, pending] = useActionState(signIn, SignInFormInitial)
  const getErrorsTranslation = useFormErrorsTranslation()

  return (
    <form action={actionState} className="flex flex-col gap-3">
      <CustomInput
        id="email-input"
        label={t("Shared.email")}
        placeholder={t("Shared.email")}
        type="email"
        name="email"
        defaultValue={state.payload.email as string}
        errorText={getErrorsTranslation(state?.errors?.email)}
      />
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
      {state?.errors?.common && <FormErrorText text={getErrorsTranslation(state.errors.common)} />}
      <Button
        className="text-body1 flex min-h-12 w-full items-center justify-center text-primaryWhite"
        type="submit"
        disabled={pending}
      >
        {pending ? <Spinner /> : t("AuthPage.enterAccountBtn")}
      </Button>
    </form>
  )
}
