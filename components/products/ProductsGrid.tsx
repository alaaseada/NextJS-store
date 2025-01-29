import { products } from '@prisma/client/edge'
import { Card, CardContent } from '../ui/card'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import Image from 'next/image'
import FavoriteToggleButton from './FavoriteToggleButton'

const ProductsGrid = ({ products }: { products: products[] }) => {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { id, name, price, company, image } = product
        const price_dollar = formatCurrency(price)

        return (
          <article key={id} className="group relative">
            <Link href={`/products/${id}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      sizes="fill"
                      width={0}
                      height={0}
                      className="w-full rounded h-64 md:h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-row justify-between mt-4">
                    <div>
                      <h2 className="text-lg capitalize">{name}</h2>
                      <h4 className="text-muted-foreground tracking-wider">
                        {company}
                      </h4>
                    </div>
                    <p className="text-lg">{formatCurrency(price)}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <FavoriteToggleButton
              className="absolute right-6 top-6"
              productId={id}
            />
          </article>
        )
      })}
    </div>
  )
}
export default ProductsGrid
