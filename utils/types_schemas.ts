import { z, ZodSchema } from 'zod'

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg+xml',
        'image/gif',
      ].includes(file.type),
    { message: 'Invalid image file type' }
  )
  .refine(
    (file) => {
      const maxSize = 2 * 1024 * 1024
      return !file || file.size <= maxSize
    },
    { message: 'Image size should be of a maximum size of 2Mb' }
  )

export const DESCRIPTION_SCHEMA = z.string().refine(
  (description) => {
    const wordCount = description.split('').length
    return wordCount >= 10 && wordCount <= 1000
  },
  { message: 'Description must be between 10 and 1000 words.' }
)

export const imageSchema = z.object({
  image: IMAGE_SCHEMA,
})

export const productSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name should be of minimum length of 4' })
    .max(100, { message: 'Name should be of a maximum length of 100' }),
  company: z
    .string()
    .min(4, { message: 'Company should be of minimum length of 4' })
    .max(100, { message: 'Company should be of a maximum length of 100' }),
  description: DESCRIPTION_SCHEMA,
  featured: z.coerce.boolean(),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: 'Price cannot be a negative value' }),
})

export const validateWithZodSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error?.errors.map((err) => err.message)
    throw new Error(errors.join(', '))
  }
  return result.data
}

export type UpdatedProductType = {
  name: string
  company: string
  description: string
  featured: boolean
  price: number
  image?: string
  clerkId?: string
}

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>

export type CartItem = {
  productId: string
  image: string
  title: string
  price: string
  amount: number
  company: string
}

export type CartState = {
  cartItems: CartItem[]
  numItemsInCart: number
  cartTotal: number
  shipping: number
  tax: number
  orderTotal: number
}
