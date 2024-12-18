import { setRequestLocale } from "next-intl/server"
import TopSection from "@/app/[locale]/(main)/_components/TopSection"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <section className="h-full">
      <TopSection />
    </section>
  )
}
