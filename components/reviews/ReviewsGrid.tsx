import { getAllProductReviews } from '@/utils/actions'
import { clerkClient } from '@clerk/express'
import ReviewCard from './ReviewCard'

const ReviewsGrid = async ({ productId }: { productId: string }) => {
  const reviews = await getAllProductReviews(productId)

  return (
    <div className="pt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map(async (review) => {
        const { id, rating, feedback, createdAt } = review
        const user = await clerkClient.users.getUser(review.clerkId)
        const reviewInfo = {
          id,
          rating,
          feedback,
          createdAt,
          name: user.firstName || 'Annonymous' + user.lastName || 'User',
          image: user.imageUrl,
        }
        return <ReviewCard key={id} reviewInfo={reviewInfo} />
      })}
    </div>
  )
}
export default ReviewsGrid
