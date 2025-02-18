'use client'
import { addReview } from '@/utils/actions'
import { FormContainer, SubmitButton, TextAreaInput } from '../form'
import { faker } from '@faker-js/faker'
import { Button } from '../ui/button'
import { useState } from 'react'
import RatingInput from './RatingInput'
import { useUser } from '@clerk/nextjs'
import { Card } from '../ui/card'

const AddReview = ({
  productId,
  reviewId,
}: {
  productId: string
  reviewId: string | null
}) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const { user } = useUser()

  return (
    <>
      {!reviewId && user && (
        <Button
          size={'lg'}
          className="capitalize"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Leave Review
        </Button>
      )}
      {showAddForm && !reviewId && (
        <Card className="p-8 mt-8">
          <FormContainer action={addReview}>
            <RatingInput name={'rating'} labelText="Product Rating" />
            <TextAreaInput
              labelText="Feedback"
              name="feedback"
              defaultValue={`${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}`}
            />
            <input type="hidden" name="productId" value={productId} />
            <SubmitButton text="submit" />
          </FormContainer>
        </Card>
      )}
    </>
  )
}
export default AddReview
