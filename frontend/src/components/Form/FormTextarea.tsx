import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { ComponentProps } from "react"
import { Textarea } from "@/components/ui/Textarea"

interface FormTextareaProps {
  name: string
  label?: string
  helperText?: string
  textareaProps?: ComponentProps<typeof Textarea>
}

export default function FormTextarea({ name, label, helperText, textareaProps }: FormTextareaProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Textarea {...textareaProps} {...field} />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
