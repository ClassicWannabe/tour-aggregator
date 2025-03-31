import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "../../globals.css"
import { ReactNode } from "react"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { AntConfigProvider } from "@/components/AntConfigProvider"
import { DayjsProvider } from "@/components/DayjsProvider"
import { isLocale } from "@/lib/utils/common"
import UserContextProvider from "@/components/UserContextProvider"
import Toaster from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "800", "900", "700"],
  style: ["normal", "italic"],
})

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "RootLayout" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) {
    notFound()
  }
  const messages = await getMessages()
  setRequestLocale(locale)
  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <DayjsProvider locale={locale}>
          <AntConfigProvider locale={locale}>
            <UserContextProvider>
              <AntdRegistry layer>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <Toaster />
                  {children}
                </NextIntlClientProvider>
              </AntdRegistry>
            </UserContextProvider>
          </AntConfigProvider>
        </DayjsProvider>
      </body>
    </html>
  )
}
