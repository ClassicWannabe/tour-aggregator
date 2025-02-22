import Header from "@/components/Header"
import { setRequestLocale } from "next-intl/server"
import Footer from "@/components/Footer"
import AuthButton from "@/components/Header/AuthButton"

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
    <main className="min-h-full flex flex-col ">
      <Header authButton={<AuthButton />} />
      {children}
      <Footer />
    </main>
  )
}
