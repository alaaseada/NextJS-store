import { Suspense } from 'react'
import FeaturedProducts from './FeaturedProducts'
import Hero from './Hero'
import LoadingContainer from '@/components/global/LoadingContainer'

const Home = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer title="featured products" />}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
export default Home
