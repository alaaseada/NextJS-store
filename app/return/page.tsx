import { redirect } from 'next/navigation'
import { stripe } from '../../lib/stripe'
import { prisma } from '@/utils/db'
import { FaRegCheckCircle, FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import ClearCartClientComponent from '@/components/cart/ClearCartButton'

const Return = async ({
  searchParams,
}: {
  searchParams: { session_id: string }
}) => {
  const { session_id } = searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const { status, customer_details, metadata } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    if (metadata) {
      const { orderId, cartId } = metadata
      await prisma.order.update({
        where: { id: orderId },
        data: { isPaid: true },
      })
      await prisma.cart.delete({
        where: {
          id: cartId,
        },
      })
    }
    return (
      <section id="success" className="text-center">
        <div className="flex flex-col gap-4 items-center justify-center font-light ">
          <FaRegCheckCircle className="text-5xl text-primary" />
          <h2 className="tracking-wider text-3xl">
            We have recieved your order
          </h2>

          <p>Order #{metadata?.orderId}</p>
          <p>
            You can check your orders in the{' '}
            <Link href={'/orders'}>Orders Page</Link>
          </p>
          <p>
            A copy of your reciept has been sent to{' '}
            <b>{customer_details?.email}</b>.
          </p>

          <p className="flex items-center gap-1">
            Thank You for shopping at NextJs Store <FaHeart />
          </p>
        </div>
        <ClearCartClientComponent />
      </section>
    )
  }
}

export default Return
