import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "800", "900", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Go Trip",
  description: "Next level tours",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
