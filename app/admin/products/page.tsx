import ProductsGridview from '@/components/admin/ProductsGridview'

const MyProductsPage = ({
  searchParams,
}: {
  searchParams: { page: number }
}) => {
  const currentPage = Number(searchParams.page) || 1
  return <ProductsGridview currentPage={currentPage} />
}
export default MyProductsPage
