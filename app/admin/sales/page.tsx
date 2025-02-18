import SectionTitle from '@/components/global/SectionTitle'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchAdminOrders, getTotalOrdersNum } from '@/utils/actions'
import { formatCurrency, formatDate } from '@/utils/format'
import Pager from '@/components/global/Pager'

const SalesPage = async ({
  searchParams,
}: {
  searchParams: { page: number }
}) => {
  const currentPage = Number(searchParams.page) || 1
  const orders = await fetchAdminOrders(currentPage)
  const totalOrdersNum = await getTotalOrdersNum()
  const totalPages = Math.ceil(totalOrdersNum / 10)
  return (
    <>
      <SectionTitle title="Orders" />
      <Table className="mt-6">
        <TableCaption className="capitalize">
          {totalPages > 1 ? (
            <div className="grid grid-cols-[1fr_auto]">
              <Pager currentPage={currentPage} totalPages={totalPages} />
              <p className="bg-secondary rounded px-4 py-2">
                Total Orders: {totalOrdersNum}
              </p>
            </div>
          ) : (
            <p className="bg-secondary rounded px-4 py-2">
              Total Orders: {totalOrdersNum}
            </p>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items Count</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Order Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableCell>{order.emailAddress}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.products}</TableCell>
                <TableCell>{formatCurrency(order.tax)}</TableCell>
                <TableCell> {formatCurrency(order.shipping)}</TableCell>
                <TableCell>{formatCurrency(order.orderTotal)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
export default SalesPage
