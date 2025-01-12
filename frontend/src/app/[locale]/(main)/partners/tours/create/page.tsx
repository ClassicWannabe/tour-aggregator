import { setRequestLocale } from "next-intl/server"
import CreateTourForm from "@/app/[locale]/(main)/partners/tours/create/_components/CreateTourForm"

export default async function TourCreate({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <section className="h-full">
      <CreateTourForm />
    </section>
  )
}
