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
import dayjs, { Dayjs } from "dayjs"
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { error } = useFormField()
        const isMultiple = datePickerProps?.multiple ?? false
        const handleChangeSingle = (date: Dayjs) => {
          field.onChange(date?.toDate())
        }
        const handleChangeMultiple = (dates: Dayjs[]) => {
          field.onChange(dates.map((date) => date.toDate()))
        }
        const getValueSingle = () => (field.value ? dayjs(field.value) : null)
        const getValueMultiple = () => field.value.map((val: Date) => dayjs(val))

        const handleChange = isMultiple ? handleChangeMultiple : handleChangeSingle
        const value = isMultiple ? getValueMultiple() : getValueSingle()

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              <DatePicker
                value={value}
                onChange={handleChange as typeof handleChangeSingle}
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
