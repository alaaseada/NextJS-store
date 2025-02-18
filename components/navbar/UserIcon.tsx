import { cn } from '@/lib/utils'
import { currentUser, User } from '@clerk/nextjs/server'
import { LucideUser2 } from 'lucide-react'

const UserIcon = async ({
  user,
  className,
}: {
  user?: User
  className?: string
}) => {
  let targetUser = user ? user : await currentUser()

  const profile_img = targetUser?.imageUrl

  if (profile_img) {
    return (
      <img
        src={profile_img}
        className={cn('rounded-full object-cover', className)}
      />
    )
  }

  return (
    <LucideUser2
      className={cn(
        'object-cover rounded-full bg-primary text-white',
        className
      )}
    />
  )
}
export default UserIcon
