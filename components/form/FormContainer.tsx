'use client'

import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { actionFunction } from '@/utils/types_schemas'

const initialState = {
  message: '',
}

type FormContainerProps = {
  action: actionFunction
  children: React.ReactNode
}

const FormContainer = ({ action, children }: FormContainerProps) => {
  const [state, submitAction] = useFormState(action, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message })
    }
  }, [state])

  return <form action={submitAction}>{children}</form>
}
export default FormContainer
