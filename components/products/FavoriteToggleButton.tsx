import { getProductUserFavId } from '@/utils/actions'
import { CardSignInButton } from '../form/Buttons'
import { currentUser } from '@clerk/nextjs/server'
import FavoriteToggleForm from './FavoriteToggleForm'

const FavoriteToggleButton = async ({
  productId,
  className,
}: {
  productId: string
  className?: string
}) => {
  const user = await currentUser()
  if (!user) {
    return <CardSignInButton className={className} />
  }
  const favId = await getProductUserFavId(productId)

  return (
    <FavoriteToggleForm
      favId={favId}
      productId={productId}
      className={className}
    />
  )
}
export default FavoriteToggleButton
