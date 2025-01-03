import { setRequestLocale } from "next-intl/server"
import TopSection from "@/app/[locale]/(main)/_components/TopSection"

interface SearchParams {
  locale: string
}

export default async function Home({ params }: { params: Promise<SearchParams> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <section className="h-full">
      <TopSection />
    </section>
  )
}
