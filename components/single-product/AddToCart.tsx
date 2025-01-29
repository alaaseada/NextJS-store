import { Button } from '../ui/button'

function AddToCart({ productId }: { productId: string }) {
  return (
    <Button className="mt-8 capitalize" size={'lg'}>
      Add to Cart
    </Button>
  )
}
export default AddToCart
