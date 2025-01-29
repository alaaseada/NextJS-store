'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

const Breadcrumbs = ({ current_page }: { current_page: string }) => {
  const pathname = usePathname().split('/')
  pathname.shift()
  pathname.pop()

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="capitalize text-base">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {pathname.map((link, index) => {
            return (
              <BreadcrumbLink
                className="capitalize text-base"
                key={`link_${index}`}
                href={`/${link}`}
              >
                {link}
              </BreadcrumbLink>
            )
          })}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize text-base">
            {current_page}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default Breadcrumbs
