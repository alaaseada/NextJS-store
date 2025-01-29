import SingleProduct from '@/components/single-product/SingleProduct'

const SingleProductPage = ({ params }: { params: { id: string } }) => {
  const id = params.id
  return <SingleProduct productId={id} />
}
export default SingleProductPage
