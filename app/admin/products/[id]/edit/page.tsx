import { fetchAdminProductDetails, updateProduct } from '@/utils/actions'
import {
  FormInput,
  CheckboxInput,
  FormContainer,
  PriceInput,
  TextAreaInput,
  SubmitButton,
} from '@/components/form'
import ImageContainer from '@/components/form/ImageContainer'

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await fetchAdminProductDetails(params.id)
  if (!product) {
    console.log('No product found')
  }

  return (
    <section>
      <h1 className="text-lg mb-8 capitalize">Update product</h1>
      <div className="border rounded-lg p-8 relative">
        <FormContainer action={updateProduct}>
          <div className="grid gap-4 my-4 md:grid-cols-2">
            <FormInput
              type="text"
              name="name"
              labelText="name"
              defaultValue={product.name}
            />
            <FormInput
              className="col-start-1"
              type="text"
              name="company"
              labelText="company"
              defaultValue={product.company}
            />
            <PriceInput className="col-start-1" defaultValue={product.price} />
            <ImageContainer
              src={product.image}
              alt={product.name}
              className="mt-4 md:absolute md:left-[55%] md:top-12"
            />
          </div>
          <TextAreaInput
            name="description"
            labelText="description"
            defaultValue={product.description}
          />
          <div className="mt-6">
            <CheckboxInput
              label="featured"
              name="featured"
              defaultChecked={product.featured}
            />
          </div>
          <input type="hidden" id="id" name="id" value={product.id} />
          <input
            type="hidden"
            name="current_img"
            id="current_img"
            value={product.image}
          />
          <SubmitButton text="Save changes" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}
export default EditProductPage
