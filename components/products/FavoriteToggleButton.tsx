import { getProductUserFavId } from '@/utils/actions'
import { CardSignInButton } from '../form/Buttons'
import { currentUser } from '@clerk/nextjs/server'
import FavoriteToggleForm from './FavoriteToggleForm'

const FavoriteToggleButton = async ({ productId }: { productId: string }) => {
  const user = await currentUser()
  if (!user) {
    return <CardSignInButton />
  }
  const favId = await getProductUserFavId(productId)

  return <FavoriteToggleForm favId={favId} productId={productId} />
}
export default FavoriteToggleButton
