import { currentUser } from '@clerk/nextjs/server'
import SectionTitle from '../global/SectionTitle'
import AddReview from './AddReview'
import ReviewsGrid from './ReviewsGrid'
import { getReviewId } from '@/utils/actions'

const ProductReviewsContainer = async ({
  productId,
}: {
  productId: string
}) => {
  const reviewId = await getReviewId(productId)

  return (
    <section>
      <SectionTitle title="reviews" cssClass="mt-12"></SectionTitle>
      <div className="mt-2">
        <AddReview productId={productId} reviewId={reviewId} />
        <ReviewsGrid productId={productId} />
      </div>
    </section>
  )
}
export default ProductReviewsContainer
