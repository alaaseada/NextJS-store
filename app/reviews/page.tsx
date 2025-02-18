import EmptyList from '@/components/global/EmptyList'
import SectionTitle from '@/components/global/SectionTitle'
import ReviewCard from '@/components/reviews/ReviewCard'
import { getUserReviews } from '@/utils/actions'
import { DeleteForm, DeleteButton } from '@/components/form/Buttons'
import { deleteReview } from '@/utils/actions'

const ReviewsPage = async () => {
  const reviews = await getUserReviews()

  if (!reviews.length) {
    return (
      <>
        <SectionTitle title="Your reviews" />
        <EmptyList
          heading="No reviews yet"
          className="mt-6 font-light text-md"
        />
      </>
    )
  }
  return (
    <div>
      <SectionTitle title="Your reviews" />
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => {
          const { id, rating, feedback, createdAt } = review
          const reviewInfo = {
            id,
            rating,
            feedback,
            createdAt,
            name: review.product.name,
            image: review.product.image,
          }
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteForm action={deleteReview} id={id}>
                <DeleteButton className="absolute top-6 right-6" />
              </DeleteForm>
            </ReviewCard>
          )
        })}
      </div>
    </div>
  )
}
export default ReviewsPage
