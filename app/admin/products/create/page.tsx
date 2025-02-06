import {
  FormInput,
  ImageInput,
  CheckboxInput,
  FormContainer,
  PriceInput,
  TextAreaInput,
  SubmitButton,
} from '@/components/form'
import { faker } from '@faker-js/faker'
import { addNewProduct } from '@/utils/actions'

const AddProductPage = () => {
  return (
    <section>
      <h1 className="text-lg mb-8 capitalize">Create product</h1>
      <div className="border rounded-lg p-8">
        <FormContainer action={addNewProduct}>
          <div className="grid gap-4 my-4 md:grid-cols-2">
            <FormInput
              type="text"
              name="name"
              labelText="name"
              defaultValue={faker.commerce.productName()}
            />
            <FormInput
              type="text"
              name="company"
              labelText="company"
              defaultValue={faker.commerce.department()}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="description"
            defaultValue={faker.commerce.productDescription()}
          />
          <div className="mt-6">
            <CheckboxInput label="featured" name="featured" />
          </div>
          <SubmitButton text="create product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}
export default AddProductPage
