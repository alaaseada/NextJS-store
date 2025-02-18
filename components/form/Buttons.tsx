'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import Link from 'next/link'
import FormContainer from './FormContainer'
import { actionFunction } from '@/utils/types_schemas'
import { Spinner } from '../ui/spinner'

type btnSize = 'default' | 'lg' | 'sm'

type SubmitButtonProps = {
  className?: string
  text?: string
  size?: btnSize
}

export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn('capitalize', className)}
      size={size}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export const EditButton = ({
  id,
  className,
}: {
  id: string
  className?: string
}) => {
  return (
    <Button
      asChild
      size={'icon'}
      variant={'ghost'}
      className={cn('w-3 h-3', className)}
    >
      <Link href={`/admin/products/${id}/edit`}>
        <FaPencil className="text-primary" />
      </Link>
    </Button>
  )
}

export const DeleteForm = ({
  action,
  id,
  className,
  children,
}: {
  action: actionFunction
  id: string
  className?: string
  children: React.ReactNode
}) => {
  const actionFn = action.bind(null, { id })
  return <FormContainer action={actionFn}>{children}</FormContainer>
}

export const DeleteButton = ({ className }: { className?: string }) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size={'icon'}
      variant={'ghost'}
      className={cn('w-3 h-3', className)}
      disabled={pending}
    >
      {pending ? (
        <Spinner size={'small'} className="text-primary"></Spinner>
      ) : (
        <FaTrash className="text-primary" />
      )}
    </Button>
  )
}

export const CardSignInButton = ({ className }: { className?: string }) => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size={'icon'}
        variant={'outline'}
        className={cn('p-2 cursor-pointer absolute', className)}
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({
  isFavorite,
  className,
}: {
  isFavorite: boolean
  className?: string
}) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size={'icon'}
      variant={'outline'}
      className={cn('p-2 cursor-pointer', className)}
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFavorite ? (
        <FaHeart className="text-yellow-500" />
      ) : (
        <FaRegHeart className="text-xs" />
      )}
    </Button>
  )
}

export const AddToCartSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button type="button" className="capitalize mt-4">
        Add to cart
      </Button>
    </SignInButton>
  )
}
