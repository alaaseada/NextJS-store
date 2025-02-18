import { calculateReviewsRating } from '@/utils/actions'
import { FaStar } from 'react-icons/fa6'

const ProductRating = async ({ productId }: { productId: string }) => {
  const { count, rating } = await calculateReviewsRating(productId)
  return (
    <div className="mb-4 flex gap-2 items-center">
      <FaStar />
      {rating} ({count}) review{count > 1 && 's'}
    </div>
  )
}
export default ProductRating
