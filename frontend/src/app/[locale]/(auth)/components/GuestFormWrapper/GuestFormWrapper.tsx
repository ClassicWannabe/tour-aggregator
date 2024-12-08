import React from "react"
import Image from "next/image"
import Typography from "@/components/ui/Typography"
import GoBackButton from "@/components/GoBackButton"

type Props = {
  children: React.ReactNode
  title: string
}

const GuestFormWrapper: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="bg-primaryWhite rounded-lg p-12 pt-4">
      <Image src="/static/icons/Logo.svg" alt="Our logo" width={152} height={28} />
      <GoBackButton />
      <Typography variant="headline4" as="h1">
        {title}
      </Typography>
      {children}
    </div>
  )
}

export default GuestFormWrapper
