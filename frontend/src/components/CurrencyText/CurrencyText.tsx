import { convertNumberInPriceFormat } from "@/lib/utils"

interface Props {
  amount: number | string
}
export default async function CurrencyText({ amount }: Props) {
  return <p className="text-xl text-[#58D427] font-extrabold">{convertNumberInPriceFormat(amount)}</p>
}
