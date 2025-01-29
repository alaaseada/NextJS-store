import { FaStar } from 'react-icons/fa6'

const ProductRating = ({ productId }: { productId: string }) => {
  const rating = 4.2
  const count = 25
  return (
    <div className="mb-4 flex gap-2 items-center">
      <FaStar />
      {rating} ({count}) review{count > 1 && 's'}
    </div>
  )
}
export default ProductRating
