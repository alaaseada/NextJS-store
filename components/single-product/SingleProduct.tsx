import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import Breadcrumbs from './Breadcrumbs'
import ProductRating from './ProductRating'
import AddToCart from './AddToCart'
import FavoriteToggleButton from '../products/FavoriteToggleButton'
import { getProductById } from '@/utils/actions'

const SingleProduct = async ({ productId }: { productId: string }) => {
  const { id, name, description, company, image, price } = await getProductById(
    productId
  )
  return (
    <div>
      <Breadcrumbs current_page={name} />
      <article className="mt-6 gap-y-8 grid lg:grid-cols-2 lg:gap-x-16">
        <div className="h-full relative">
          <Image
            src={image}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            fill
            priority
            alt={name}
            className="rounded-md object-cover"
          />
        </div>
        <div>
          <div className="flex gap-4 items-center mb-1">
            <h2 className="uppercase font-bold text-xl">{name}</h2>
            <FavoriteToggleButton productId={id} />
          </div>
          <ProductRating productId={id} />
          <h4 className="capitalize tracking-wider mb-4 text-lg">{company}</h4>
          <p className="mb-4 tracking-wider text-muted-foreground bg-slate-100 py-2 px-4 w-fit rounded">
            {formatCurrency(price)}
          </p>
          <p className="text-slate-700 text-justify leading-8">{description}</p>
          <AddToCart productId={id} />
        </div>
      </article>
    </div>
  )
}
export default SingleProduct
