import React from "react"
import GoBackButton from "@/components/GoBackButton"
import Logo from "@/components/Logo"

type Props = {
  children: React.ReactNode
  title: string
}

const GuestFormWrapper: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="bg-primaryWhite rounded-lg p-12 pt-4 flex flex-col gap-6 w-full xs:w-[420px]">
      <Logo />
      <GoBackButton />
      <h1 className="text-headline4 text-primaryBlack">{title}</h1>
      {children}
    </div>
  )
}

export default GuestFormWrapper
