import { currentUser } from '@clerk/nextjs/server'
import { LucideUser2 } from 'lucide-react'

const UserIcon = async () => {
  const user = await currentUser()
  const profile_img = user?.imageUrl

  if (profile_img) {
    return (
      <img src={profile_img} className="w-6 h-6 rounded-full object-cover" />
    )
  }

  return (
    <LucideUser2 className="w-6 h-6 object-cover rounded-full bg-primary text-white" />
  )
}
export default UserIcon
