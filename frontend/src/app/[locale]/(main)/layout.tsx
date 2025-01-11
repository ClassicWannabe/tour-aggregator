import Header from "@/components/Header"
import { setRequestLocale } from "next-intl/server"
import Footer from "@/components/Footer"

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="h-full">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
