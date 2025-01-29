'use client'
import { SignOutButton } from '@clerk/nextjs'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { ExitIcon } from '@radix-ui/react-icons'

const SignoutLink = () => {
  const handleLogout = () => {
    toast({ description: 'You are successfully logged out' })
  }
  return (
    <SignOutButton>
      <Link
        href="/"
        className="relative flex gap-2 items-center rounded-sm px-2 py-1.5 text-sm outline-none"
        onClick={handleLogout}
      >
        <ExitIcon /> Logout
      </Link>
    </SignOutButton>
  )
}
export default SignoutLink
