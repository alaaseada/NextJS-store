import { Skeleton } from '@/components/ui/skeleton'

const loading = () => {
  return (
    <div>
      <article className="mt-6 gap-y-8 grid lg:grid-cols-2 lg:gap-x-16">
        <Skeleton className="w-64 h-64 md:h-full md:w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-96 h-8" />
          <Skeleton className="w-40 h-4 mb-4" />
          <Skeleton className="w-20 h-8 mb-4" />
          <Skeleton className="mb-4 py-2 px-4 w-40" />
          <Skeleton className="w-full h-[100px]" />
        </div>
      </article>
    </div>
  )
}
export default loading
