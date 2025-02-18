import { Card, CardContent } from '../ui/card'
import UserIcon from '../navbar/UserIcon'
import { ReviewCardProps } from '@/utils/types_schemas'
import { deleteReview } from '@/utils/actions'
import { DeleteForm } from '../form/Buttons'
import Rating from './Rating'
import Feedback from './Feedback'
import DateInfo from './DateInfo'

const ReviewCard = ({
  reviewInfo: { id, rating, feedback, createdAt, name, image },
  children,
}: ReviewCardProps) => {
  return (
    <article className="group relative">
      <Card className="h-full md:min-h-16 transform group-hover:shadow-xl transition-shadow duration-500">
        <CardContent className="p-4">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 mt-4">
            <img src={image} className="w-16 h-16 object-cover rounded-full" />
            <div>
              <p>{name}</p>
              <div className="flex gap-2 items-center">
                <Rating rating={rating} />
                <DateInfo
                  date={createdAt}
                  className="bg-secondary px-4 rounded"
                />
              </div>
              <Feedback feedback={feedback} />
            </div>
          </div>
          {children}
        </CardContent>
      </Card>
    </article>
  )
}
export default ReviewCard
