import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const SectionTitle = ({
  title,
  className,
}: {
  title: string
  className?: string
}) => {
  return (
    <div>
      <h2
        className={cn(
          'text-3xl font-medium tracking-wider capitalize mb-8',
          className
        )}
      >
        {title}
      </h2>
      <Separator />
    </div>
  )
}
export default SectionTitle
