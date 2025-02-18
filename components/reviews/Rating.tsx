import { FaStar, FaRegStar } from 'react-icons/fa'

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <div key={index}>
            {index + 1 <= rating ? (
              <FaStar className="text-yellow-500 w-3 h-3" />
            ) : (
              <FaRegStar className="text-primary w-3 h-3" />
            )}
          </div>
        )
      })}
    </div>
  )
}
export default Rating
