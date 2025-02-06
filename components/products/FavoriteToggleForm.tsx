'use client'
import { FormContainer } from '../form'
import { CardSubmitButton } from '../form/Buttons'
import { toggleFavoriteAction } from '@/utils/actions'
import { usePathname } from 'next/navigation'

type FavoriteToggleFormProps = {
  favId: string | null
  productId: string
}

const FavoriteToggleForm = ({ favId, productId }: FavoriteToggleFormProps) => {
  const pathName = usePathname()
  const toggleFavoriteActionBinded = toggleFavoriteAction.bind(null, {
    favId,
    productId,
    pathName,
  })

  return (
    <FormContainer action={toggleFavoriteActionBinded}>
      <CardSubmitButton isFavorite={favId ? true : false} />
    </FormContainer>
  )
}
export default FavoriteToggleForm
