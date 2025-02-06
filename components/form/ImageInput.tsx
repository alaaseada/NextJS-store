import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const name = 'image'
const ImageInput = ({
  labelText = 'image',
  className,
  required = true,
}: {
  labelText?: string
  className?: string
  required?: boolean
}) => {
  return (
    <div className={cn('mb-2', className)}>
      <Label htmlFor={name} className="capitalize">
        {labelText}
      </Label>
      <Input
        type="file"
        name={name}
        id={name}
        required={required}
        accept="image/*"
      />
    </div>
  )
}
export default ImageInput
