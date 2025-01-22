import React, { RefAttributes } from "react"
import Checkbox from "@/components/ui/CheckBox"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils/common"
import { CheckboxProps } from "@radix-ui/react-checkbox"

interface Props extends Omit<CheckboxProps & RefAttributes<HTMLButtonElement>, "ref"> {
  label?: string
  id?: string
  wrapperClassname?: string
}

const CustomCheckbox: React.FC<Props> = ({ label, id, wrapperClassname, ...otherProps }) => {
  return (
    <div className={cn("flex gap-2", wrapperClassname ?? "")}>
      <Checkbox id={id} {...otherProps} className="mt-[1px]" />
      {!!label && <Label htmlFor={id}>{label}</Label>}
    </div>
  )
}

export default CustomCheckbox
