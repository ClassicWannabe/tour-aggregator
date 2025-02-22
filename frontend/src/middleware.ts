import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { NextRequest, NextResponse } from "next/server"
import RouteNames from "@/lib/consts/route-names"
import { verifySession } from "@/lib/utils/session"

const protectedRoutes = [RouteNames.PersonalAccount, RouteNames.CreateTour]
const authRoutes = [RouteNames.SignIn, RouteNames.SignUp]

const nextIntlMiddleware = createMiddleware(routing)

export async function combinedMiddleware(req: NextRequest) {
  const response = nextIntlMiddleware(req)

  const path = req.nextUrl.pathname
  const localeMatch = path.match(/^\/(ru|kz|en)(\/.*)?$/)
  const pathWithoutLocale = localeMatch?.[2] || path
  const isProtectedRoute = protectedRoutes.includes(pathWithoutLocale as RouteNames)
  const isAuthRoute = authRoutes.includes(pathWithoutLocale as RouteNames)
  const isUserAuthorized = await verifySession()

  if (isProtectedRoute && !isUserAuthorized) {
    return NextResponse.redirect(new URL(`/${localeMatch?.[1] || "ru"}/${RouteNames.SignIn}`, req.nextUrl))
  }

  if (isUserAuthorized && isAuthRoute) {
    return NextResponse.redirect(new URL(RouteNames.Home, req.nextUrl))
  }

  return response
}

export default combinedMiddleware

export const config = {
  matcher: ["/", "/(ru|kz|en)/:path*"],
}
