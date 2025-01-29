import ProductsContainer from '@/components/products/ProductsContainer'

type ProductsPageProps = {
  searchParams: { layout?: string; searchKey?: string }
}
const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const layout = searchParams.layout || 'grid'
  const searchKey = searchParams.searchKey || ''

  return <ProductsContainer layout={layout} searchKey={searchKey} />
}
export default ProductsPage
