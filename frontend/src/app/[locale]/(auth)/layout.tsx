import { setRequestLocale } from "next-intl/server"

export default async function GuestLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <section className="h-full bg-colorBgLayout">{children}</section>
}
