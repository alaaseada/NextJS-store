import EmptyList from '@/components/global/EmptyList'
import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/products/ProductsGrid'
import { getUsersFavProducts } from '@/utils/actions'

const FavoritesPage = async () => {
  const products = await getUsersFavProducts()
  return (
    <section>
      <SectionTitle title="favorite list" />
      {!products.length ? (
        <EmptyList
          className="mt-6 font-light"
          heading="you have not added any products to your favorite list yet!"
        />
      ) : (
        <ProductsGrid products={products} />
      )}
    </section>
  )
}
export default FavoritesPage
