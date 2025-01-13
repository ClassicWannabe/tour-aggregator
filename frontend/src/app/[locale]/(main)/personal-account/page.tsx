import { setRequestLocale } from "next-intl/server"

export default async function PersonalAccount({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <section className="h-full">PERSONAL ACCOUNT</section>
}
