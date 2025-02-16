import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { decrypt } from "next/dist/server/app-render/encryption-utils"

export default createMiddleware(routing)

export const config = {
  matcher: ["/", "/(ru|kz|en)/:path*"],
}

// const protectedRoutes = ["/dashboard"]
// const publicRoutes = ["/login"]
//
// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname
//   const isProtectedRoute = protectedRoutes.includes(path)
//   const isPublicRoute = publicRoutes.includes(path)
//
//   const cookie = await cookies()
//   const token = cookie.get("token")
//   const session = await decrypt(cookie)
//
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl))
//   }
//
//   if (isPublicRoute && session?.userId) {
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
//   }
//
//   return NextResponse.next()
// }
