import Link from 'next/link'
import { Button } from '../ui/button'
import { TiShoppingCart } from 'react-icons/ti'

const CartButton = async () => {
  const num_in_cart = 3
  return (
    <Button
      size={'icon'}
      variant={'outline'}
      asChild
      className="flex justify-center items-center relative"
    >
      <Link href={'/cart'}>
        <span className="absolute -top-3 -right-3 rounded-full bg-primary text-primary-foreground w-6 h-6 text-xs flex items-center justify-center">
          {num_in_cart}
        </span>
        <TiShoppingCart className="text-2xl" />
      </Link>
    </Button>
  )
}
export default CartButton
