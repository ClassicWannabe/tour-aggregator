import Button from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { DayPickerRangeProps } from "react-day-picker"

interface FormDateRangePickerProps {
  name: string
  startDateName: string
  endDateName: string
  placeholder?: string
  label?: string
  helperText?: string
  calendarProps?: DayPickerRangeProps
}

export default function FormDateRangePicker({
  name,
  startDateName,
  endDateName,
  label,
  helperText,
  placeholder,
  calendarProps,
}: FormDateRangePickerProps) {
  const getFieldValue = (field: ControllerRenderProps<FieldValues, string>) => {
    if (field.value?.[startDateName]) {
      if (field.value[endDateName]) {
        return `${format(field.value[startDateName], "LLL dd, y")} - ${format(field.value[endDateName], "LLL dd, y")}`
      } else {
        return format(field.value[startDateName], "LLL dd, y")
      }
    } else {
      return placeholder && <span>{placeholder}</span>
    }
  }
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const from = field.value?.[startDateName]
        const to = field.value?.[endDateName]

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={cn("w-full pl-3 text-left flex flex-row items-center", !from && "text-muted-foreground")}
                  >
                    {getFieldValue(field)}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  selected={{ from, to }}
                  onSelect={(dateRange) => {
                    field.onChange({ [startDateName]: dateRange?.from, [endDateName]: dateRange?.to })
                  }}
                  {...calendarProps}
                />
              </PopoverContent>
            </Popover>
            {helperText && <FormDescription>{helperText}</FormDescription>}
          </FormItem>
        )
      }}
    />
  )
}
