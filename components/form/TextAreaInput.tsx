import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type TextAreaInputProps = {
  name: string
  labelText?: string
  defaultValue?: string
}

const TextAreaInput = ({
  name,
  labelText,
  defaultValue,
}: TextAreaInputProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        required
        rows={5}
        className="leading-loose"
      />
    </div>
  )
}
export default TextAreaInput
