'use client'
import { addToCartAction } from '@/utils/actions'
import { FormContainer, SubmitButton } from '../form'
import AmountSelector from './AmountSelector'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { AddToCartSignInButton } from '../form/Buttons'
import { Mode } from '@/utils/types_schemas'

function AddToCart({ productId }: { productId: string }) {
  const [selectedAmount, setSelectedAmount] = useState(1)
  const user = useUser()

  const handleAmountChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let name = e.currentTarget.name
    switch (name) {
      case 'minus':
        setSelectedAmount((prev) => {
          return prev === 1 ? 1 : prev - 1
        })
        break
      case 'plus':
        setSelectedAmount((prev) => {
          return prev === 20 ? 20 : prev + 1
        })
        break
    }
  }
  return (
    <>
      <AmountSelector
        handleAmountChange={handleAmountChange}
        selectedAmount={selectedAmount}
        mode={Mode.Product}
        className="mt-4"
      />
      {user.isSignedIn ? (
        <AddToCartSubmissionForm
          productId={productId}
          amount={selectedAmount}
        />
      ) : (
        <AddToCartSignInButton />
      )}
    </>
  )
}
export default AddToCart

const AddToCartSubmissionForm = ({
  productId,
  amount,
}: {
  productId: string
  amount: number
}) => {
  const addCartItemAction = addToCartAction.bind(null, {
    productId,
    amount,
  })

  return (
    <FormContainer action={addCartItemAction}>
      <SubmitButton text="Add to Cart" className="mt-4" />
    </FormContainer>
  )
}
