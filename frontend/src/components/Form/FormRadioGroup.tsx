import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { ComponentProps } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

interface FormRadioGroupProps {
  name: string
  items: { label: string; value: string }[]
  label?: string
  containerProps?: ComponentProps<typeof FormItem>
}

export default function FormRadioGroup({ name, label, containerProps, items }: FormRadioGroupProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem {...containerProps}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                {items.map(({ label, value }) => (
                  <FormItem key={value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={value} />
                    </FormControl>
                    <FormLabel className="font-normal">{label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
