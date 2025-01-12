import { setRequestLocale } from "next-intl/server"

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <section className="h-full p-10 bg-colorBgLayout">{children}</section>
}
