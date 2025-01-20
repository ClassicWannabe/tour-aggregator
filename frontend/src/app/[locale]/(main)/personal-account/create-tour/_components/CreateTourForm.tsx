"use client"
import { Form } from "@/components/ui/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useMultistepForm from "@/lib/hooks/useMultistepForm"
import { Separator } from "@/components/ui/Separator"
import {
  amenitiesFormSchema,
  attachmentsFormSchema,
  formSchema,
  FormType,
  mainInformationFormSchema,
  tourProgramFormSchema,
} from "@/app/[locale]/(main)/personal-account/create-tour/_components/schema"
import MainInformationForm from "@/app/[locale]/(main)/personal-account/create-tour/_components/MainInformationForm"
import AmenitiesForm from "@/app/[locale]/(main)/personal-account/create-tour/_components/AmenitiesForm"
import FormButtons from "@/app/[locale]/(main)/personal-account/create-tour/_components/FormButtons/FormButtons"
import useBeforeunload from "@/lib/hooks/useBeforeunload"
import TourProgramForm from "@/app/[locale]/(main)/personal-account/create-tour/_components/TourProgramForm"
import AttachmentsForm from "@/app/[locale]/(main)/personal-account/create-tour/_components/AttachmentsForm"

export default function CreateTourForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tourType: "",
      numberOfPeople: "",
      dateRange: {
        startDate: undefined,
        endDate: undefined,
      },
      tourPrice: "",
      thesis: "",
      tourName: "",
      description: "",
      location: "",
      isTourFree: false,
      inclusions: [],
      exclusions: [],
      tourProgram: [
        { time: "", location: "" },
        { time: "", location: "" },
      ],
      images: [],
    },
    mode: "all",
  })
  const isFormDirty = form.formState.isDirty
  useBeforeunload(isFormDirty)

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <AttachmentsForm />,
    <TourProgramForm />,
    <AmenitiesForm />,
    <MainInformationForm />,
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
            onCancelClick={() => {}}
            onPreviewClick={() => {}}
            onBackClick={back}
            onNextClick={handleNextClick}
          />
        </form>
      </Form>
    </section>
  )
}
