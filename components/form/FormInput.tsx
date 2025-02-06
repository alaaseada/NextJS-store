import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type FormInputProps = {
  labelText: string
  type: 'text' | 'number' | 'email' | 'password'
  name: string
  placeholder?: string
  defaultValue?: string
  className?: string
}
const FormInput = ({
  labelText,
  type,
  name,
  placeholder,
  defaultValue,
  className,
}: FormInputProps) => {
  return (
    <div className={cn('mb-2', className)}>
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </div>
  )
}
export default FormInput
