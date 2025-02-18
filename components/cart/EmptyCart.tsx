import EmptyList from '@/components/global/EmptyList'
import SectionTitle from '@/components/global/SectionTitle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const EmptyCart = () => {
  return (
    <>
      <SectionTitle title="Your cart" />
      <div className="flex items-center mt-6">
        <EmptyList
          heading="The cart is currently empty"
          className="font-light text-sm tracking-wider"
        />
        ,
        <Button
          asChild
          variant={'link'}
          className="font-light text-sm tracking-wider p-0 ml-1"
        >
          <Link href={'/products'}>Go and Fill it :)</Link>
        </Button>
      </div>
    </>
  )
}
export default EmptyCart
