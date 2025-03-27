"use client"
import React from "react"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils/common"
import FormErrorText from "@/components/ui/FormErrorText"
import { Textarea } from "@/components/ui/Textarea"

interface Props extends React.ComponentProps<typeof Textarea> {
  label?: string
  id?: string
  placeholder?: string
  className?: string
  errorText?: string | string[]
}

const CustomTextarea: React.FC<Props> = ({ label, id, placeholder, className, errorText, ...otherProps }) => {
  return (
    <div className={cn("flex flex-col gap-1", className ?? "")}>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <Textarea id={id} placeholder={placeholder} {...otherProps} />
      {errorText && <FormErrorText text={errorText} />}
    </div>
  )
}

export default CustomTextarea
