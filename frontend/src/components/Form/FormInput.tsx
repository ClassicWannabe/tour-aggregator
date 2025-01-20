import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import { ComponentProps, RefObject } from "react"

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
        const handleRefAssignment = (e: HTMLInputElement | null) => {
          field.ref(e)
          if (inputProps?.ref) {
            const refObject = inputProps.ref as RefObject<HTMLInputElement | null>
            refObject.current = e
          }
        }

        return (
          <FormItem {...containerProps}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input {...field} {...inputProps} ref={handleRefAssignment} />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
