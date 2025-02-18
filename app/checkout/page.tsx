import Checkout from '@/components/cart/Checkout'

const Checkoutpage = ({
  searchParams,
}: {
  searchParams: {
    orderId: string
    cartId: string
  }
}) => {
  const { orderId, cartId } = searchParams
  return (
    <div>
      <Checkout orderId={orderId} cartId={cartId} />
    </div>
  )
}
export default Checkoutpage
