import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const RatingInput = ({
  name,
  labelText,
}: {
  name: string
  labelText?: string
}) => {
  return (
    <Select name={name} required>
      <SelectTrigger className="w-[180px] mb-2">
        <SelectValue className="capitalize" placeholder={labelText || name} />
      </SelectTrigger>
      <SelectContent>
        {[5, 4, 3, 2, 1].map((item) => {
          return (
            <SelectItem key={`item-${item}`} value={item.toString()}>
              {item}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
export default RatingInput
