"use client"
import React from "react"
import Label from "@/components/ui/Label"
import Input from "@/components/ui/Input"
import { cn } from "@/lib/utils/common"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
  placeholder?: string
  className?: string
}

const CustomInput: React.FC<Props> = ({ label, id, placeholder, className, ...otherProps }) => {
  return (
    <div className={cn("flex flex-col gap-1", className ?? "")}>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} type="email" placeholder={placeholder} {...otherProps} />
    </div>
  )
}

export default CustomInput
