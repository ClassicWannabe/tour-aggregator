import React from "react"
import Image from "next/image"

type Props = {
  isMobile?: boolean
}

const Logo: React.FC<Props> = ({ isMobile }) => {
  return isMobile ? (
    <Image src="/static/icons/Logo-mobile.svg" alt="Our logo" width={24} height={24} />
  ) : (
    <Image src="/static/icons/Logo.svg" alt="Our logo" width={152} height={28} />
  )
}

export default Logo
