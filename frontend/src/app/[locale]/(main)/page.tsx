import { setRequestLocale } from "next-intl/server"
import TopSection from "./_components/TopSection"
import PopularToursSection from "./_components/PopularToursSection"
import AboutUsSection from "./_components/AboutUsSection"
import { SearchParams } from "next/dist/server/request/search-params"

interface Params {
  locale: string
}

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <section>
      <TopSection />
      <PopularToursSection searchParams={searchParams} />
      <AboutUsSection />
    </section>
  )
}
