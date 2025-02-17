"use client"
import { Form } from "@/components/ui/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useMultistepForm from "@/lib/hooks/useMultistepForm"
import { Separator } from "@/components/ui/Separator"
import FormButtons from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormButtons/FormButtons"
import useBeforeunload from "@/lib/hooks/useBeforeunload"
import { useTranslations } from "next-intl"
import { FormType, getSchemas } from "./schema"
import { MainInformationForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm"
import { AttachmentsForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm"
import { TourProgramForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/TourProgramForm"
import { AmenitiesForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/AmenitiesForm"
import { useMemo } from "react"
import { useRouter } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { Location } from "@/actions/fetch-locations"
import { createTour } from "@/actions/create-tour"

type CreateTourFormProps = {
  locations: Location[]
}

export function CreateTourForm({ locations }: CreateTourFormProps) {
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
    },
    mode: "all",
  })

  const isFormDirty = form.formState.isDirty
  useBeforeunload(isFormDirty)

  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <AttachmentsForm key={AttachmentsForm.name} />,
    <MainInformationForm key={MainInformationForm.name} locations={locations} />,
    <AmenitiesForm key={AmenitiesForm.name} />,
    <TourProgramForm key={TourProgramForm.name} />,
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
    await createTour({
      ...formData,
      photoIds,
      startDate,
      endDate,
      pricePerPerson,
      program,
      recurrenceDates,
      type: formData.tourType,
      locationId: formData.location,
    })
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
    <section className="my-10 lg:py-20 lg:px-16 p-2 bg-background">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          {step}
          <Separator className="my-10" />
          <FormButtons
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
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
