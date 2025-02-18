'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'

type PagerProps = {
  totalPages: number
  className?: string
  currentPage: number
}

const Pager = ({ currentPage, totalPages, className }: PagerProps) => {
  let searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const current_location = usePathname()

  if (params.get('page')) {
    params.delete('page')
  }

  return (
    <Pagination className={cn('', className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${current_location}?page=${
              currentPage - 1 === 0 ? totalPages : currentPage - 1
            }${params.size ? `&${params.toString()}` : ''}`}
          />
        </PaginationItem>
        <PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1
            return (
              <PaginationLink
                key={index}
                href={`${current_location}?page=${pageNumber}${
                  params.size ? `&${params.toString()}` : ''
                }`}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            )
          })}
        </PaginationItem>
        <PaginationItem>
          {totalPages > 5 && <PaginationEllipsis />}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`${current_location}?page=${
              currentPage + 1 > totalPages ? 1 : currentPage + 1
            }${params.size ? `&${params.toString()}` : ''}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default Pager
