import { fetchOrCreateCart, updateCart } from '@/utils/actions'
import { CartItemsList, CartTotals } from '@/components/cart'
import SectionTitle from '@/components/global/SectionTitle'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import EmptyCart from '@/components/cart/EmptyCart'

const CartPage = async () => {
  const user = await auth()
  if (!user) redirect('/')

  const previousCart = await fetchOrCreateCart({
    clerkId: user.userId as string,
  })
  const cart = await updateCart({ cart: previousCart })

  if (cart.itemsCount === 0) {
    return <EmptyCart />
  }

  return (
    <>
      <SectionTitle title="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cart.cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotals cart={cart} />
        </div>
      </div>
    </>
  )
}
export default CartPage
