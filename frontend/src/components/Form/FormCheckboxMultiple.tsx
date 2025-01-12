import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import Checkbox from "@/components/ui/CheckBox"

interface FormCheckboxMultipleProps {
  name: string
  items: { label: string; value: string }[]
}

export default function FormCheckboxMultiple({ name, items }: FormCheckboxMultipleProps) {
  return (
    <FormField
      name={name}
      render={() => {
        return (
          <FormItem>
            {items.map((item) => (
              <FormField
                key={item.value}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem key={item.value} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.value])
                              : field.onChange(field.value?.filter((value: string) => value !== item.value))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
