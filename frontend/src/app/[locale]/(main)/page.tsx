import { setRequestLocale } from "next-intl/server"
import TopSection from "./_components/TopSection"
import PopularToursSection from "./_components/PopularToursSection"

interface SearchParams {
  locale: string
}

export default async function Home({ params }: { params: Promise<SearchParams> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <section className="h-full">
      <TopSection />
      <PopularToursSection />
    </section>
  )
}
