"use client"
import React from "react"
import Label from "@/components/ui/Label"
import Input from "@/components/ui/Input"
import { cn } from "@/lib/utils/common"
import FormErrorText from "@/components/ui/FormErrorText"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
  placeholder?: string
  className?: string
  errorText?: string | string[]
}

const CustomInput: React.FC<Props> = ({ label, id, placeholder, className, errorText, ...otherProps }) => {
  return (
    <div className={cn("flex flex-col gap-1", className ?? "")}>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} type="email" placeholder={placeholder} {...otherProps} />
      {errorText && <FormErrorText text={errorText} />}
    </div>
  )
}

export default CustomInput
