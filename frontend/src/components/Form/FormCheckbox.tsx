import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/Form"
import Checkbox from "@/components/ui/CheckBox"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils/common"

interface FormCheckboxProps {
  name: string
  label?: string
  helperText?: string
  containerProps?: ComponentProps<typeof FormItem>
}

export default function FormCheckbox({ name, label, helperText, containerProps }: FormCheckboxProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem {...containerProps} className={cn("flex flex-row space-x-3 space-y-0", containerProps?.className)}>
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              {label && <FormLabel>{label}</FormLabel>}
              {helperText && <FormDescription>{helperText}</FormDescription>}
            </div>
          </FormItem>
        )
      }}
    />
  )
}
