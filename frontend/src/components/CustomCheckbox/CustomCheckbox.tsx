import React, { RefAttributes } from "react"
import Checkbox from "@/components/ui/CheckBox"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils/common"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import FormErrorText from "@/components/ui/FormErrorText"

interface Props extends Omit<CheckboxProps & RefAttributes<HTMLButtonElement>, "ref"> {
  label?: string
  id?: string
  wrapperClassname?: string
  errorText?: string
}

const CustomCheckbox: React.FC<Props> = ({ label, id, wrapperClassname, errorText, ...otherProps }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className={cn("flex gap-2", wrapperClassname ?? "")}>
        <Checkbox {...otherProps} id={id} className="mt-[1px]" />
        {!!label && <Label htmlFor={id}>{label}</Label>}
      </div>
      {errorText && <FormErrorText text={errorText} />}
    </div>
  )
}

export default CustomCheckbox
