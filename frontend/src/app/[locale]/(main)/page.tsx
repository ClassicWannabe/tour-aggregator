import Button from "../../../components/ui/Button"
import Input from "@/components/ui/Input"
import Logo from "@/components/Logo"

export default function Home() {
  return (
    <section className="h-full flex items-center justify-center flex-col">
      <Logo />
      <Button>btn</Button>
      <Input type="text" />
      <p className="text-2xl font-extrabold">Test</p>
    </section>
  )
}
