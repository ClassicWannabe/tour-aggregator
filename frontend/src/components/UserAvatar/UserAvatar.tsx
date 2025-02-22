import React from "react"
import { UserRound } from "lucide-react"
import { Link } from "@/i18n/routing"
import RouteNames from "@/lib/consts/route-names"

export default function UserAvatar() {
  return (
    <Link href={RouteNames.PersonalAccount}>
      <div className="cursor-pointer">
        <span className="rounded-full flex items-center justify-center w-8 h-8 bg-primaryWhite">
          <UserRound size={24} color="#00000026" />
        </span>
      </div>
    </Link>
  )
}
