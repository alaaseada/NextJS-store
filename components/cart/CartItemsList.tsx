import { FirstColumn, SecondColumn, FourthColumn } from './CartItemColumns'
import { Card } from '../ui/card'
import ThirdColumn from './ThirdColumn'
import { CartItemWithProduct } from '@/utils/types_schemas'

const CartItemsList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div>
      {cartItems.map((item) => {
        const { id: cartItemId, amount } = item
        const { id: productId, name, company, image, price } = item.product
        return (
          <div key={cartItemId} className="group relative">
            <Card
              key={cartItemId}
              className="flex flex-col gap-y-4 gap-x-4 p-6 mb-8 md:flex-row flex-wrap group-hover:shadow-lg transition-shadow duration-500"
            >
              <FirstColumn image={image} title={name} />
              <SecondColumn title={name} company={company} id={productId} />
              <ThirdColumn amount={amount} id={cartItemId} />
              <FourthColumn price={Number(price)} />
            </Card>
          </div>
        )
      })}
    </div>
  )
}
export default CartItemsList
