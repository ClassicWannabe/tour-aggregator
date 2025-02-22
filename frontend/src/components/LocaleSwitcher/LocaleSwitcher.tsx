import { useLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import LocaleSwitcherSelect from "./LocaleSwitcherSelect"
import { LOCALES } from "@/lib/consts/locales"

type Props = {
  color: "black" | "white"
}

export default function LocaleSwitcher({ color }: Props) {
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect color={color} defaultValue={locale}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {LOCALES[cur]}
        </option>
      ))}
    </LocaleSwitcherSelect>
  )
}
