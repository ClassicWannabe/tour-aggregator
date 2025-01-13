import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

interface FormSelectProps {
  name: string
  options: { value: string; text?: string }[]
  placeholder?: string
  label?: string
  helperText?: string
}

export default function FormSelect({ name, label, helperText, options, placeholder }: FormSelectProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map(({ value, text }) => (
                  <SelectItem key={value} value={value}>
                    {text ?? value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
