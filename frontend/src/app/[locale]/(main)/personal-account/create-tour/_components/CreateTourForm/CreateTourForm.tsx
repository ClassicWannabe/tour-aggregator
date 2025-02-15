"use client"
import { Form } from "@/components/ui/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useMultistepForm from "@/lib/hooks/useMultistepForm"
import { Separator } from "@/components/ui/Separator"
import FormButtons from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormButtons/FormButtons"
import useBeforeunload from "@/lib/hooks/useBeforeunload"
import { useTranslations } from "next-intl"
import { FormTypeStringified, getSchemas } from "./schema"
import { MainInformationForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm"
import { AttachmentsForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm"
import { TourProgramForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/TourProgramForm"
import { AmenitiesForm } from "@/app/[locale]/(main)/personal-account/create-tour/_components/AmenitiesForm"
import { useMemo } from "react"
import { useRouter } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { Location } from "@/actions/fetch-locations"

type CreateTourFormProps = {
  locations: Location[]
}

export function CreateTourForm({ locations }: CreateTourFormProps) {
  const t = useTranslations("CreateTourForm.zod")
  const router = useRouter()
  const { formSchema, mainInformationFormSchema, amenitiesFormSchema, tourProgramFormSchema, attachmentsFormSchema } =
    useMemo(() => getSchemas(t), [t])
  const form = useForm<FormTypeStringified>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tourType: "",
      peopleCount: "",
      dateRange: {
        startDate: undefined,
        endDate: undefined,
      },
      thesis: "",
      title: "",
      description: "",
      priceInfo: {
        pricePerPerson: "",
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

  console.log(form.getValues())

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <MainInformationForm key={MainInformationForm.name} locations={locations} />,
    <AmenitiesForm key={AmenitiesForm.name} />,
    <TourProgramForm key={TourProgramForm.name} />,
    <AttachmentsForm key={AttachmentsForm.name} />,
  ])

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData)
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
            onCreateClick={() => {}}
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
