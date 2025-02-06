'use client'
import { FormContainer } from '../form'
import { CardSubmitButton } from '../form/Buttons'
import { toggleFavoriteAction } from '@/utils/actions'
import { usePathname } from 'next/navigation'

type FavoriteToggleFormProps = {
  favId: string | null
  productId: string
  className?: string
}

const FavoriteToggleForm = ({
  favId,
  productId,
  className,
}: FavoriteToggleFormProps) => {
  const pathName = usePathname()
  const toggleFavoriteActionBinded = toggleFavoriteAction.bind(null, {
    favId,
    productId,
    pathName,
  })

  return (
    <FormContainer action={toggleFavoriteActionBinded}>
      <CardSubmitButton
        isFavorite={favId ? true : false}
        className={className}
      />
    </FormContainer>
  )
}
export default FavoriteToggleForm
