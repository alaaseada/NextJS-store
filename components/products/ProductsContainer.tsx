import {
  fetchAllProducts,
  getTotalNumberOfFilteredProducts,
} from '@/utils/actions'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import EmptyList from '../global/EmptyList'
import { Separator } from '../ui/separator'
import { Grid2X2CheckIcon, ListChecksIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Pager from '../global/Pager'

type ProductsContainerProps = {
  layout: string
  searchKey: string
  page: number
}

const ProductsContainer = async ({
  layout,
  searchKey,
  page,
}: ProductsContainerProps) => {
  const products = await fetchAllProducts(searchKey, page)
  const products_count = await getTotalNumberOfFilteredProducts(searchKey)

  const totalPages = Math.ceil(products_count / 9)

  const searchTerm = searchKey ? `&searchKey=${searchKey}` : ''
  return (
    <>
      <section>
        <div className="flex justify-between">
          <h2 className="text-xl font-medium tracking-wider capitalize mb-6">
            {products_count} {products_count > 1 ? 'products' : 'product'}
          </h2>
          <div className="flex gap-2">
            <Button
              variant={layout === 'grid' ? 'default' : 'outline'}
              size={'sm'}
            >
              <Link href={`/products/?layout=grid${searchTerm}`}>
                <Grid2X2CheckIcon />
              </Link>
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'outline'}
              size={'sm'}
            >
              <Link href={`/products/?layout=list${searchTerm}`}>
                <ListChecksIcon />
              </Link>
            </Button>
          </div>
        </div>
        <Separator />
      </section>
      {products_count ? (
        <>
          {layout === 'grid' ? (
            <ProductsGrid products={products} />
          ) : (
            <ProductsList products={products} />
          )}
          {totalPages > 1 && (
            <Pager
              className="mt-6"
              totalPages={totalPages}
              currentPage={page}
            />
          )}
        </>
      ) : (
        <EmptyList
          heading="Sorry, No items found that match your search"
          className="capitalize"
        />
      )}
    </>
  )
}
export default ProductsContainer
