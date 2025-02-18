import { Cart } from '@prisma/client/edge'
import { Card, CardTitle } from '../ui/card'
import { formatCurrency } from '@/utils/format'
import { Separator } from '../ui/separator'
import { createOrderAction } from '@/utils/actions'
import { FormContainer, SubmitButton } from '../form'

const CartTotals = ({ cart }: { cart: Cart }) => {
  const { itemsCount, cartTotal, tax, shipping, orderTotal } = cart
  const cartTotalFields = Object.entries({
    subtotal: cartTotal,
    shipping,
    tax,
    'order total': orderTotal,
  })
  return (
    <>
      <Card className="mt-4 p-8">
        <CardTitle className="font-light">
          {cartTotalFields.map((item, index) => {
            return (
              <CardRow
                key={index}
                label={item[0]}
                amount={item[1]}
                isLast={index === cartTotalFields.length - 1}
              />
            )
          })}
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="Place order" className="w-full mt-8" />
      </FormContainer>
    </>
  )
}
export default CartTotals

const CardRow = ({
  label,
  amount,
  isLast = false,
}: {
  label: string
  amount: number
  isLast?: boolean
}) => {
  return (
    <div className={isLast ? `mt-8 font-medium` : ''}>
      <p className="flex justify-between my-2">
        <span className="capitalize">{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {!isLast && <Separator />}
    </div>
  )
}
