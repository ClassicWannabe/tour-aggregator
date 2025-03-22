"use client"
import React, { useActionState } from "react"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import { useLocale, useTranslations } from "next-intl"
import { Tour } from "@/lib/interfaces/tours"
import { formatDateToCustomString } from "@/lib/utils/common"
import CustomInput from "@/components/CustomInput/CustomInput"
import useFormErrorsTranslation from "@/lib/hooks/useFormErrorsTranslation"
import { bookTour } from "@/actions/book-tour"
import CustomCheckbox from "@/components/CustomCheckbox"
import { Link } from "@/i18n/routing"
import CustomSelect from "@/components/CustomSelect"

type Props = {
  dates: Tour["dates"]
}

const FormInitialState = {
  payload: {
    dateId: "",
    email: "",
    phone: "",
    fullName: "",
    offeroAgreement: "off",
  },
  errors: {},
}

const TourContactModal: React.FC<Props> = ({ dates }) => {
  const [state, actionState, pending] = useActionState(bookTour, FormInitialState)
  const t = useTranslations()
  const getErrorsTranslation = useFormErrorsTranslation()
  const locale = useLocale()

  const dateOptions = dates.map((date) => ({
    value: date.id,
    label: formatDateToCustomString(date.startDate, locale),
  }))

  return (
    <Modal title={t("TourDetails.contactInfo")} trigger={<Button>Связаться</Button>}>
      <form action={actionState} className="flex flex-col gap-3">
        <CustomSelect
          options={dateOptions}
          label={t("TourDetails.chooseDate")}
          placeholder={t("Shared.choose")}
          name="dateId"
          id="date-select"
          errorText={getErrorsTranslation(state?.errors?.dateId)}
          required
        />
        <CustomInput
          id="name-input"
          label={t("TourDetails.name")}
          placeholder={t("TourDetails.name")}
          type="text"
          name="name"
          defaultValue={state?.payload.name as string}
          errorText={getErrorsTranslation(state?.errors?.name)}
          required
        />
        <CustomInput
          id="phone-input"
          label={t("TourDetails.phone")}
          placeholder={t("TourDetails.phone")}
          type="text"
          name="phone"
          defaultValue={state?.payload.phone as string}
          errorText={getErrorsTranslation(state?.errors?.phone)}
          required
        />
        <CustomInput
          id="email-input"
          label={t("TourDetails.email")}
          placeholder={t("TourDetails.email")}
          type="text"
          name="email"
          defaultValue={state?.payload.email as string}
          errorText={getErrorsTranslation(state?.errors?.email)}
          required
        />
        <CustomCheckbox
          label={t.rich("TourDetails.offeroAgreement", {
            link: (chunks) => (
              <Link href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {chunks}
              </Link>
            ),
          })}
          id="offeroAgreement"
          name="offeroAgreement"
          defaultChecked={state?.payload.offeroAgreement === "on"}
          errorText={getErrorsTranslation(state?.errors?.offeroAgreement)}
          required
        />
        <Button className="w-full text-body1 text-primaryWhite mt-2" type="submit" disabled={pending}>
          {t("TourDetails.submitApplication")}
        </Button>
      </form>
    </Modal>
  )
}

export default TourContactModal
