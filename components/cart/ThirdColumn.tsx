'use client'
import { DeleteForm, SubmitButton } from '../form'
import AmountSelector from '../single-product/AmountSelector'
import { removeCartItemAction, updateCartItemAction } from '@/utils/actions'
import { Mode } from '@/utils/types_schemas'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'

const ThirdColumn = ({ amount, id }: { amount: number; id: string }) => {
  const [selectedAmount, setSelectedAmount] = useState(amount)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAmountChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let name = e.currentTarget.name
    let newAmount = amount
    switch (name) {
      case 'minus':
        newAmount = amount === 1 ? 1 : amount - 1
        setSelectedAmount(newAmount)
        break
      case 'plus':
        newAmount = amount === 20 ? 20 : amount + 1
        setSelectedAmount(newAmount)
        break
    }
    setIsLoading(true)
    toast({ description: 'Calculating.....' })
    const { message } = await updateCartItemAction({
      id,
      amount: newAmount,
    })
    setIsLoading(false)
    toast({ description: message })
  }

  return (
    <div className="md:ml-8 flex flex-col items-center">
      <p className="tracking-wider">Amount</p>
      <AmountSelector
        isLoading={isLoading}
        selectedAmount={selectedAmount}
        mode={Mode.Cart}
        handleAmountChange={handleAmountChange}
      />
      <DeleteForm action={removeCartItemAction} id={id}>
        <SubmitButton text="remove" size="sm" className="mt-2" />
      </DeleteForm>
    </div>
  )
}
export default ThirdColumn
