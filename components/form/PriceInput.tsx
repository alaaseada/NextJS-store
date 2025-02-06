import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type FormInputNumberProps = {
  defaultValue?: number
  className?: string
}

const name = 'price'

const PriceInput = ({ defaultValue, className }: FormInputNumberProps) => {
  return (
    <div className={cn('mb-2', className)}>
      <Label htmlFor={name} className="capitalize">
        price ($)
      </Label>
      <Input
        type="number"
        name={name}
        id={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  )
}

export default PriceInput
