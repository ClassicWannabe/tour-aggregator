import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import { ComponentProps } from "react"

interface FormInputProps {
  name: string
  label?: string
  helperText?: string
  inputProps?: ComponentProps<typeof Input>
  containerProps?: ComponentProps<typeof FormItem>
}

export default function FormInput({ name, label, helperText, inputProps, containerProps }: FormInputProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem {...containerProps}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input {...inputProps} {...field} />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
