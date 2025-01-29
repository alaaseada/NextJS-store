import { Button } from '@/components/ui/button'
import { FaRegHeart } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

const FavoriteToggleButton = ({
  productId,
  className,
}: {
  productId: string
  className?: string
}) => {
  return (
    <Button
      asChild
      size={'icon'}
      variant={'outline'}
      className={cn('p-2 cursor-pointer', className)}
    >
      <FaRegHeart className="text-xs" />
    </Button>
  )
}
export default FavoriteToggleButton
