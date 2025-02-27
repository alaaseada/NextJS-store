import React from 'react'
import SectionTitle from './SectionTitle'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingContainer = ({ title }: { title: string }) => {
  return (
    <section className="pt-8">
      <SectionTitle title={title} />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </section>
  )
}

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
export default LoadingContainer
