import ProductsContainer from '@/components/products/ProductsContainer'

type ProductsPageProps = {
  searchParams: { layout?: string; searchKey?: string; page?: number }
}
const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const layout = searchParams.layout || 'grid'
  const searchKey = searchParams.searchKey || ''
  const page = Number(searchParams.page) || 1

  return <ProductsContainer layout={layout} searchKey={searchKey} page={page} />
}
export default ProductsPage
