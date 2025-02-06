import { Skeleton } from '../ui/skeleton'

const LoadingTable = ({ rows = 5 }: { rows?: number }) => {
  const tableRows = Array.from({ length: rows }).map((_, index) => {
    return (
      <div className="mb-4" key={index}>
        <Skeleton key={index} className="rounded w-full h-8" />
      </div>
    )
  })
  return <>{tableRows}</>
}
export default LoadingTable
