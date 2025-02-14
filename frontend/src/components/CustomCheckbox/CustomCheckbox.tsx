import React, { DetailedHTMLProps, InputHTMLAttributes, RefAttributes } from "react"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils/common"
import FormErrorText from "@/components/ui/FormErrorText"

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  id?: string
  wrapperClassname?: string
  errorText?: string
}

const CustomCheckbox: React.FC<Props> = ({ label, id, wrapperClassname, errorText, ...otherProps }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className={cn("flex gap-2", wrapperClassname ?? "")}>
        <input
          type="checkbox"
          {...otherProps}
          id={id}
          className="mt-[1px] peer h-4 w-4 shrink-0 rounded-sm border border-border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primaryGreen data-[state=checked]:text-primaryWhite data-[state=checked]:border-primaryGreen"
        />
        {/*<span className={cn("flex items-center justify-center text-current")}>*/}
        {/*  <Check className="h-4 w-4" />*/}
        {/*</span>*/}
        {/*<Checkbox {...otherProps} id={id} className="mt-[1px]" />*/}
        {!!label && <Label htmlFor={id}>{label}</Label>}
      </div>
      {errorText && <FormErrorText text={errorText} />}
    </div>
  )
}

export default CustomCheckbox
