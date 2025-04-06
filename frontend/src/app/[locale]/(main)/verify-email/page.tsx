import { SearchParams } from "next/dist/server/request/search-params"
import { redirect } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"
import { verifyEmail } from "@/actions/verify-email"
import ErrorStatus from "@/app/[locale]/(main)/verify-email/_components/ErrorStatus"
import SuccessStatus from "@/app/[locale]/(main)/verify-email/_components/SuccessStatus"

export default async function VerifyEmailPage({
  searchParams,
  params,
}: {
  searchParams: Promise<SearchParams>
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const awaitedSearchParams = await searchParams
  const { code, email } = awaitedSearchParams

  if (!code || !email) {
    redirect({ href: RouteNames.Home, locale })
  }

  const { error } = await verifyEmail(email as string, code as string)

  return (
    <div className="flex w-full items-center justify-center">
      {error ? <ErrorStatus email={email as string} /> : <SuccessStatus />}
    </div>
  )
}
