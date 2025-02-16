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
import TimePicker, { TimePickerProps } from "antd/es/time-picker"
import dayjs, { Dayjs } from "dayjs"
import { cn } from "@/lib/utils/common"

interface FormTimePickerProps {
  name: string
  label?: string
  helperText?: string
  timePickerProps?: TimePickerProps
}

export default function FormTimePicker({ name, label, helperText, timePickerProps }: FormTimePickerProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { error } = useFormField()

        const handleChange = (date: Dayjs) => {
          field.onChange(date?.toDate())
        }
        const value = field.value ? dayjs(field.value) : null

        return (
          <FormItem className="mb-4">
            {label && <FormLabel>{label}</FormLabel>}
            <br />

            <FormControl>
              <TimePicker
                value={value}
                onChange={handleChange}
                {...timePickerProps}
                className={cn(
                  error ? "border-destructive [&>.ant-picker-active-bar]:bg-destructive" : "",
                  timePickerProps?.className,
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
