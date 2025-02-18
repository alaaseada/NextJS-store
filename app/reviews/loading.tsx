'use client'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import SectionTitle from '@/components/global/SectionTitle'

const loading = () => {
  return (
    <>
      <SectionTitle title="Your reviews" />
      <div className="pt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReviewLoadingCard />
        <ReviewLoadingCard />
        <ReviewLoadingCard />
      </div>
    </>
  )
}
export default loading

const ReviewLoadingCard = () => {
  return (
    <Card className="h-full md:min-h-16">
      <CardHeader>
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 mt-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[150px] h-4 mb-2" />
            <Skeleton className="w-[150px] h-4" />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
