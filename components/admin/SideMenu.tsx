'use client'

import { AdminLinks } from '@/utils/links'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

const SideMenu = () => {
  const pathname = usePathname()
  return (
    <div className="flex justify-center items-center md:flex-col md:gap-y-2 md:items-start md:justify-start">
      {AdminLinks.map((link) => {
        const { href, label, id } = link
        return (
          <Button
            key={`admin-link-${id}`}
            asChild
            size={'lg'}
            variant={href === pathname ? 'default' : 'ghost'}
            className="min-w-36 font-normal tracking-wider"
          >
            <Link href={href}>{label}</Link>
          </Button>
        )
      })}
    </div>
  )
}
export default SideMenu
