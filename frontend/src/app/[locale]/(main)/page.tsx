import Button from "../../../components/ui/Button"
import Input from "@/components/ui/Input"
import Logo from "@/components/Logo"
import { setRequestLocale } from "next-intl/server"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <section className="h-full flex items-center justify-center flex-col">
      <Logo />
      <Button>btn</Button>
      <Input type="text" />
      <p className="text-2xl font-extrabold">Test</p>
    </section>
  )
}
