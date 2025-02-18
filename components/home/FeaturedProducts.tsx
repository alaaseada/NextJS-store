import { fetchFeaturedProducts } from '@/utils/actions'
import SectionTitle from '../global/SectionTitle'
import EmptyList from '../global/EmptyList'
import ProductsGrid from '../products/ProductsGrid'

const FeaturedProducts = async () => {
  const featured_products = await fetchFeaturedProducts()

  if (featured_products.length === 0) return <EmptyList />

  return (
    <section className="pt-24">
      <SectionTitle title="Top Sellers" />
      <ProductsGrid products={featured_products} />
    </section>
  )
}
export default FeaturedProducts
