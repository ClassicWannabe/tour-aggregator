"use client"
import { Form } from "@/components/ui/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useMultistepForm from "@/lib/hooks/useMultistepForm"
import { Separator } from "@/components/ui/Separator"
import useBeforeunload from "@/lib/hooks/useBeforeunload"
import { useTranslations } from "next-intl"
import { FormType, getSchemas } from "./schema"
import { useMemo } from "react"
import { useRouter } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { Location } from "@/actions/fetch-locations"
import { createTour } from "@/actions/create-tour"
import { MainInformationForm } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/MainInformationForm"
import { AmenitiesForm } from "../AmenitiesForm"
import { TourProgramForm } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/TourProgramForm"
import { AttachmentsForm } from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/AttachmentsForm"
import FormButtons from "@/app/[locale]/(main)/personal-account/(mutate-tour)/_components/FormButtons/FormButtons"
import { editTour } from "@/actions/edit-tour"

type CreateTourFormProps = {
  locations: Location[]
  editDetails?: {
    tourId: string
    initialForm?: FormType
  }
}

export function MutateTourForm({ locations, editDetails }: CreateTourFormProps) {
  const t = useTranslations("CreateTourForm.zod")
  const router = useRouter()
  const { formSchema, mainInformationFormSchema, amenitiesFormSchema, tourProgramFormSchema, attachmentsFormSchema } =
    useMemo(() => getSchemas(t), [t])
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: {},
      thesis: "",
      title: "",
      description: "",
      priceInfo: {
        isTourFree: false,
      },
      inclusions: [],
      exclusions: [],
      tourProgram: [
        [
          { time: undefined, description: "" },
          { time: undefined, description: "" },
        ],
      ],
      meetingPlace: "",
      images: [],
      recurringTour: {
        isRecurringTour: false,
        recurringDates: [],
      },
      isEditForm: false,
      ...editDetails?.initialForm,
    },
    mode: "all",
  })

  const isFormDirty = form.formState.isDirty
  useBeforeunload(isFormDirty)

  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <MainInformationForm key={MainInformationForm.name} locations={locations} />,
    <AmenitiesForm key={AmenitiesForm.name} />,
    <TourProgramForm key={TourProgramForm.name} />,
    <AttachmentsForm key={AttachmentsForm.name} />,
  ])

  const handleSubmit = form.handleSubmit(async (formData) => {
    const photoIds = formData.images.map(({ id }) => id)
    const startDate = new Date(formData.dateRange.startDate ?? "").toISOString()
    const endDate = new Date(formData.dateRange.endDate ?? "").toISOString()
    const pricePerPerson = formData.priceInfo.pricePerPerson ? +formData.priceInfo.pricePerPerson : 0
    const program = formData.tourProgram.map((dayProgram) =>
      dayProgram.map((item) => ({ ...item, time: item.time.toISOString() })),
    )
    const recurrenceDates = formData.recurringTour.recurringDates.map((date) => date.toISOString())
    const data = {
      ...formData,
      photoIds,
      startDate,
      endDate,
      pricePerPerson,
      program,
      recurrenceDates,
      type: formData.tourType,
      locationId: formData.location,
    }
    if (editDetails) {
      await editTour(editDetails.tourId, data)
    } else {
      await createTour(data)
    }

    router.push(RouteNames.PersonalAccount)
  })

  const handleNextClick = async () => {
    let isValid
    switch (step.type) {
      case MainInformationForm: {
        isValid = await form.trigger(mainInformationFormSchema.keyof().options)
        break
      }
      case AmenitiesForm: {
        isValid = await form.trigger(amenitiesFormSchema.keyof().options)
        break
      }
      case TourProgramForm: {
        isValid = await form.trigger(tourProgramFormSchema.keyof().options)
        break
      }
      case AttachmentsForm: {
        isValid = await form.trigger(attachmentsFormSchema.keyof().options)
        break
      }
      default: {
        isValid = true
      }
    }

    if (isValid) {
      next()
    }
  }

  const handleCancelClick = () => {
    router.push(RouteNames.PersonalAccount)
  }

  return (
    <section className="my-10 rounded border bg-background p-2 lg:px-16 lg:py-20">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          {step}
          <Separator className="my-10" />
          <FormButtons
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isEdit={!!editDetails}
            onCancelClick={handleCancelClick}
            onPreviewClick={() => {}}
            onBackClick={back}
            onNextClick={handleNextClick}
          />
        </form>
      </Form>
    </section>
  )
}
