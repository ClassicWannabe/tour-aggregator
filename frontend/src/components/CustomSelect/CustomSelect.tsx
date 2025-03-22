import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { cn } from "@/lib/utils/common"
import Label from "@/components/ui/Label"
import FormErrorText from "@/components/ui/FormErrorText"
import { SelectProps } from "@radix-ui/react-select"

interface Props extends SelectProps {
  options: { value: string; label: string }[]
  label?: string
  id?: string
  placeholder?: string
  className?: string
  errorText?: string | string[]
}

const CustomSelect: React.FC<Props> = ({ options, label, id, placeholder, className, errorText, ...otherProps }) => {
  return (
    <div className={cn("flex flex-col gap-1", className ?? "")}>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <Select {...otherProps}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent id={id}>
          {options.map((item, idx) => (
            <SelectItem key={idx} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorText && <FormErrorText text={errorText} />}
    </div>
  )
}

export default CustomSelect
