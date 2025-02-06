import { cn } from '@/lib/utils'

const EmptyList = ({
  heading = 'No Items Found',
  className,
}: {
  heading?: string
  className?: string
}) => {
  return <h2 className={cn('text-xl capitalize', className)}>{heading}</h2>
}
export default EmptyList
