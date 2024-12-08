import Header from "@/components/Header"
import { setRequestLocale } from "next-intl/server"

export default function MainLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)
  return (
    <section className="h-full">
      <Header />
      {children}
    </section>
  )
}
