import { ActionState } from "@/lib/interfaces/common"
import { useToast } from "@/lib/hooks/use-toast"
import useFormErrorsTranslation from "@/lib/hooks/useFormErrorsTranslation"

type CreateToastCallbacksOptions = { loadingMessage?: string }

export const useCreateToastCallbacks = () => {
  const { toast, dismiss } = useToast()
  const getTranslation = useFormErrorsTranslation()

  return (options?: CreateToastCallbacksOptions) => {
    return {
      onStart: () => {
        const id = toast({
          title: options?.loadingMessage || "Loading ...",
        }).id
        return id
      },
      onEnd: (reference: string) => {
        dismiss(reference)
      },
      onSuccess: (result: ActionState) => {
        if (result?.message) {
          toast({ title: getTranslation(result.message) })
        }
      },
      onError: (result: ActionState) => {
        if (result?.message) {
          toast({ title: getTranslation(result.message), variant: "destructive" })
        }
      },
    }
  }
}
