import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const SectionTitle = ({
  title,
  cssClass,
}: {
  title: string
  cssClass?: string
}) => {
  return (
    <>
      <h2
        className={cn(
          'text-3xl font-medium tracking-wider capitalize mb-6',
          cssClass
        )}
      >
        {title}
      </h2>
      <Separator />
    </>
  )
}
export default SectionTitle
