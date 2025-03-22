import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils/common"
import FormErrorText from "@/components/ui/FormErrorText"

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: React.ReactNode
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
          className="appearance-none relative peer mt-[1px] peer h-4 w-4 shrink-0 rounded-sm border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primaryGreen checked:text-primaryWhite checked:border-primaryGreen cursor-pointer"
        />
        <svg
          className="absolute w-4 h-4 mt-[1px] hidden peer-checked:block pointer-events-none cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        {!!label && <Label htmlFor={id}>{label}</Label>}
      </div>
      {errorText && <FormErrorText text={errorText} />}
    </div>
  )
}

export default CustomCheckbox
