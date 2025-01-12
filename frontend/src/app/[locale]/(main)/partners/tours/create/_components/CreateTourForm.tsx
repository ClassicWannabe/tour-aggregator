"use client"
import MainInformationForm from "@/app/[locale]/(main)/partners/tours/create/_components/MainInformationForm"
import { FormButtons } from "@/app/[locale]/(main)/partners/tours/create/_components/FormButtons"
import { Form } from "@/components/ui/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMultistepForm } from "@/lib/hooks/useMultistepForm"
import {
  amenitiesFormSchema,
  formSchema,
  FormType,
  mainInformationFormSchema,
} from "@/app/[locale]/(main)/partners/tours/create/_components/schema"
import { Separator } from "@/components/ui/Separator"
import { useEffect } from "react"
import AmenitiesForm from "@/app/[locale]/(main)/partners/tours/create/_components/AmenitiesForm"

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
    },
    mode: "all",
  })
  const isFormDirty = form.formState.isDirty

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <MainInformationForm />,
    <AmenitiesForm />,
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
      default: {
        isValid = true
      }
    }

    if (isValid) {
      next()
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) {
        event.preventDefault()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isFormDirty])

  return (
    <section className="lg:mx-40 mx-0 my-10 lg:py-20 lg:px-16 p-2 bg-background">
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
