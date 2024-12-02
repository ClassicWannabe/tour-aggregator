import Typography from "../../../components/ui/Typography"
import Button from "../../../components/ui/Button"
import GuestFormWrapper from "@/app/(auth)/components/GuestFormWrapper"

export default function SignIn() {
  return (
    <section className="h-full flex justify-center items-center">
      <GuestFormWrapper title="Вход в Личный кабинет">
        <Typography variant="headline1" as="h1">
          123
        </Typography>
        <Typography variant="body3" as="p">
          123
        </Typography>
        <p></p>
        <Button>btn</Button>
        <Button color="secondary" variant="filled">
          btn
        </Button>
      </GuestFormWrapper>
    </section>
  )
}
