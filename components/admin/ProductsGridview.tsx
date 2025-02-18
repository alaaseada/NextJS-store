import { formatCurrency } from '@/utils/format'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  deleteProduct,
  fetchAdminProducts,
  getTotalNumberOfProducts,
} from '@/utils/actions'
import Link from 'next/link'
import { DeleteButton, DeleteForm, EditButton } from '../form/Buttons'
import EmptyList from '../global/EmptyList'
import Pager from '../global/Pager'

const ProductsGridview = async ({ currentPage }: { currentPage: number }) => {
  const totalProducts = await getTotalNumberOfProducts()
  const my_products = await fetchAdminProducts(currentPage)

  if (!totalProducts) {
    return <EmptyList heading="No products have been added yet!" />
  }

  const totalPages = Math.ceil(totalProducts / 10)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {my_products.map((product) => {
            const { id, name, company, price } = product
            return (
              <TableRow key={`product-${id}`}>
                <TableCell>
                  <Link
                    href={`/products/${id}`}
                    className="hover:underline tracking-wide font-light"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex gap-4 items-center">
                  <Link href={`/admin/products/${id}/edit`}>
                    <EditButton id={id} />
                  </Link>
                  <DeleteForm id={id} action={deleteProduct}>
                    <DeleteButton />
                  </DeleteForm>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableCaption className="capitalize">
          {totalPages > 1 ? (
            <div className="grid grid-cols-[1fr_auto]">
              <Pager currentPage={currentPage} totalPages={totalPages} />
              <p className="bg-secondary rounded px-4 py-2">
                Total products: {totalProducts}
              </p>
            </div>
          ) : (
            <p className="bg-secondary rounded px-4 py-2">
              Total products: {totalProducts}
            </p>
          )}
        </TableCaption>
      </Table>
    </>
  )
}
export default ProductsGridview
