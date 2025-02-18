import Link from 'next/link'
import { Button } from '../ui/button'
import { TiShoppingCart } from 'react-icons/ti'
import { getCartItemsCount } from '@/utils/actions'

const CartButton = async () => {
  let num_in_cart = (await getCartItemsCount()) || 0
  return (
    <Button
      size={'icon'}
      variant={'outline'}
      asChild
      className="flex justify-center items-center relative"
    >
      <Link href={'/cart'}>
        {num_in_cart !== 0 && (
          <span className="absolute -top-3 -right-3 rounded-full bg-primary text-primary-foreground w-6 h-6 text-xs flex items-center justify-center">
            {num_in_cart}
          </span>
        )}
        <TiShoppingCart className="text-2xl" />
      </Link>
    </Button>
  )
}
export default CartButton
