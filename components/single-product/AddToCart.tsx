'use client'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'

function AddToCart({ productId }: { productId: string }) {
  return (
    <Button
      className="mt-8 capitalize"
      size={'lg'}
      onClick={() => {
        toast({
          description: 'Product has been successfully added to the cart',
        })
      }}
    >
      Add to Cart
    </Button>
  )
}
export default AddToCart
