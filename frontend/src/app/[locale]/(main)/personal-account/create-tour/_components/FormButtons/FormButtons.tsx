"use client"
import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl"
import { FormButtonsWrapper } from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormButtons/FormButtonsWrapper"

type FormButtonsProps = {
  isFirstStep: boolean
  isLastStep: boolean
  onCancelClick(): void
  onBackClick(): void
  onNextClick(): void
  onPreviewClick(): void
}

export default function FormButtons({
  isLastStep,
  isFirstStep,
  onBackClick,
  onPreviewClick,
  onCancelClick,
  onNextClick,
}: FormButtonsProps) {
  const t = useTranslations("CreateTourForm.button")

  const renderCancelButton = () => (
    <Button type="button" color="secondary" variant="outlined" onClick={onCancelClick}>
      {t("cancel")}
    </Button>
  )
  const renderNextButton = () => (
    <Button type="button" onClick={onNextClick}>
      {t("next")}
    </Button>
  )
  const renderBackButton = () => (
    <Button type="button" color="secondary" variant="outlined" onClick={onBackClick}>
      {t("back")}
    </Button>
  )
  const renderCreateButton = () => <Button type="submit">{t("create")}</Button>
  const renderPreviewButton = () => (
    <Button type="button" onClick={onPreviewClick}>
      {t("preview")}
    </Button>
  )

  if (isFirstStep) {
    return (
      <FormButtonsWrapper>
        {renderCancelButton()}
        {renderNextButton()}
      </FormButtonsWrapper>
    )
  }
  if (isLastStep) {
    return (
      <FormButtonsWrapper>
        {renderBackButton()}
        {renderPreviewButton()}
        {renderCreateButton()}
      </FormButtonsWrapper>
    )
  }

  return (
    <FormButtonsWrapper>
      {renderBackButton()}
      {renderNextButton()}
    </FormButtonsWrapper>
  )
}
