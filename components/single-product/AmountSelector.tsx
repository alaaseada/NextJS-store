'use client'
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci'
import { Button } from '../ui/button'
import { Mode } from '@/utils/types_schemas'
import { cn } from '@/lib/utils'

type AmountSelectorProductProps = {
  handleAmountChange: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  selectedAmount: number
  mode: Mode.Product
  className?: string
}

type AmountSelectorCartProps = {
  handleAmountChange: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>
  selectedAmount: number
  mode: Mode.Cart
  isLoading: boolean
  className?: string
}

const AmountSelector = (
  props: AmountSelectorProductProps | AmountSelectorCartProps
) => {
  const { handleAmountChange, selectedAmount, mode, className } = props
  const cart = mode === Mode.Cart

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Button
        variant={'ghost'}
        size={'sm'}
        className="text-muted-foreground p-0"
        name="minus"
        onClick={(e) => handleAmountChange(e)}
        disabled={cart ? props.isLoading : false}
      >
        <CiSquareMinus className="w-6 h-6" />
      </Button>
      <p>{selectedAmount}</p>
      <Button
        variant={'ghost'}
        size={'sm'}
        className="text-muted-foreground p-0"
        name="plus"
        onClick={(e) => handleAmountChange(e)}
        disabled={cart ? props.isLoading : false}
      >
        <CiSquarePlus className="w-6 h-6" />
      </Button>
    </div>
  )
}
export default AmountSelector
