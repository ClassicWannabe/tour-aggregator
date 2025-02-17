"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { ComponentProps } from "react"
import { Textarea } from "@/components/ui/Textarea"
import { cn } from "@/lib/utils/common"

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
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Textarea
                {...field}
                {...textareaProps}
                className={cn(error ? "border-destructive" : "", textareaProps?.className)}
              />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
