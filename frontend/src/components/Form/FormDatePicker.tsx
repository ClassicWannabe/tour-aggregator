"use client"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/Form"
import DatePicker, { DatePickerProps } from "antd/es/date-picker"
import dayjs from "dayjs"
import { cn } from "@/lib/utils/common"

interface FormDatePickerProps {
  name: string
  label?: string
  helperText?: string
  datePickerProps?: DatePickerProps
}

export default function FormDatePicker({ name, label, helperText, datePickerProps }: FormDatePickerProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { error } = useFormField()

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(date?.toDate())
                }}
                {...datePickerProps}
                className={cn(
                  error ? "border-destructive [&>.ant-picker-active-bar]:bg-destructive" : "",
                  datePickerProps?.className,
                )}
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
