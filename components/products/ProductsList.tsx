import { Product } from '@prisma/client/edge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import FavoriteToggleButton from './FavoriteToggleButton'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid gap-4 mt-8">
      {products.map((product) => {
        const { id, name, price, description, company, image } = product
        return (
          <div key={id} className="relative group">
            <Link href={`/products/${id}`}>
              <Card
                key={id}
                className="transform group-hover:shadow-md transition-shadow duration-500"
              >
                <CardContent className="p-4 flex flex-col gap-4 md:flex-row">
                  <div className="relative overflow-hidden h-64 md:h-32 md:w-48">
                    <Image
                      alt={name}
                      src={image}
                      sizes="fill"
                      priority
                      fill
                      className="object-cover rounded-md transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-row justify-between md:flex-col md:justify-normal">
                    <div>
                      <h2 className="text-lg capitalize">{name}</h2>
                      <h4 className="text-muted-foreground text-sm tracking-wider">
                        {company}
                      </h4>
                    </div>
                    <p className="text-lg md:mt-2">{formatCurrency(price)}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <FavoriteToggleButton
              className="absolute right-6 top-6"
              productId={id}
            />
          </div>
        )
      })}
    </div>
  )
}
export default ProductsList
