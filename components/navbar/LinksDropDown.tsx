import { Links } from '@/utils/links'
import Link from 'next/link'
import { Button } from '../ui/button'
import { TextAlignLeftIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserIcon from './UserIcon'
import SignoutLink from './SignoutLink'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUp,
  SignUpButton,
} from '@clerk/nextjs'

const LinksDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="flex gap-4 max-w-[100px]">
          <TextAlignLeftIcon className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {Links.map((link) => {
            const { id, href, label } = link
            return (
              <DropdownMenuItem key={id}>
                <Link href={href} className="capitalize w-full">
                  {label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <SignoutLink />
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropDown
