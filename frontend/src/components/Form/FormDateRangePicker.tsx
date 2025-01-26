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
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import DatePicker, { RangePickerProps } from "antd/es/date-picker"
import dayjs, { Dayjs } from "dayjs"
import { cn } from "@/lib/utils/common"

interface FormDateRangePickerProps {
  name: string
  startDateName: string
  endDateName: string
  label?: string
  helperText?: string
  datePickerProps?: RangePickerProps
}

export default function FormDateRangePicker({
  name,
  startDateName,
  endDateName,
  label,
  helperText,
  datePickerProps,
}: FormDateRangePickerProps) {
  const getFieldValue = (field: ControllerRenderProps<FieldValues, string>): [Dayjs | null, Dayjs | null] => {
    const startDate = field.value[startDateName] ? dayjs(field.value[startDateName]) : null
    const endDate = field.value[endDateName] ? dayjs(field.value[endDateName]) : null
    return [startDate, endDate]
  }

  const handleChange = (
    field: ControllerRenderProps<FieldValues, string>,
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    field.onChange({ [startDateName]: dates?.[0]?.toDate(), [endDateName]: dates?.[1]?.toDate() })
  }
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { error } = useFormField()

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              <DatePicker.RangePicker
                value={getFieldValue(field)}
                onChange={(dates) => handleChange(field, dates)}
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
