'use server'
import { prisma } from '@/utils/db'
import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'
import {
  imageSchema,
  productSchema,
  validateWithZodSchema,
  reviewSchema,
  ReviewType,
} from './types_schemas'
import { uploadImage, deleteImage } from './supabase'
import { revalidatePath } from 'next/cache'
import { UpdatedProductType } from './types_schemas'
import { Cart } from '@prisma/client/edge'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import { error } from 'console'

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    redirect('/')
  }
  return user.id
}

const checkAuthorization = async () => {
  const userId = await getAuthUser()
  if (!userId || !process.env.ADMIN_USER_IDS?.includes(userId)) redirect('/')
  return userId
}

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'An error occured',
  }
}

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  })
  return products
}

export const getTotalNumberOfFilteredProducts = async (
  searchKey?: string | null
) => {
  if (!searchKey) searchKey = ''
  return prisma.product.count({
    where: {
      OR: [
        {
          name: {
            contains: searchKey,
            mode: 'insensitive',
          },
        },
        {
          company: {
            contains: searchKey,
            mode: 'insensitive',
          },
        },
      ],
    },
  })
}

export const fetchAllProducts = async (
  searchKey?: string | null,
  pageNumber: number = 1,
  itemPerPage: number = 9
) => {
  if (!searchKey) searchKey = ''

  const products = prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      OR: [
        {
          name: {
            contains: searchKey,
            mode: 'insensitive',
          },
        },
        {
          company: {
            contains: searchKey,
            mode: 'insensitive',
          },
        },
      ],
    },
    take: itemPerPage,
    skip: (pageNumber - 1) * itemPerPage,
  })
  return products
}

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })
  if (!product) redirect('/')
  return product
}

export const addNewProduct = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const clerkId = await checkAuthorization()
    const imageFile = formData.get('image') as File
    const inputs = Object.fromEntries(formData.entries())

    const data = validateWithZodSchema(productSchema, inputs)
    const { image } = validateWithZodSchema(imageSchema, { image: imageFile })

    const publicURL = await uploadImage(image as File)
    await prisma.product.create({
      data: { ...data, image: publicURL, clerkId },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/admin/products')
}

export const deleteProduct = async (prevState: {
  id: string
}): Promise<{ message: string }> => {
  await checkAuthorization()
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: prevState.id,
      },
    })
    await deleteImage(deletedProduct.image)
    revalidatePath('/admin/products')
    return { message: 'Product has been successfully deleted' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchAdminProducts = async (
  pageNumber: number = 1,
  itemPerPage: number = 10
) => {
  await checkAuthorization()
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: itemPerPage,
    skip: (pageNumber - 1) * itemPerPage,
  })
}

export const getTotalNumberOfProducts = async () => {
  return prisma.product.count()
}

export const fetchAdminProductDetails = async (id: string) => {
  await checkAuthorization()
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })
  if (!product) redirect('/')
  return product
}

export const updateProduct = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const clerkId = await checkAuthorization()

    const productId = formData.get('id') as string
    const current_img = formData.get('current_img') as string
    const imageFile = formData.get('image') as File

    const inputs = Object.fromEntries(formData.entries())
    const validatedInputs = validateWithZodSchema(productSchema, inputs)
    let updatedProduct: UpdatedProductType = { ...validatedInputs, clerkId }

    if (imageFile.size) {
      const { image } = validateWithZodSchema(imageSchema, { image: imageFile })
      const publicURL = await uploadImage(image as File)
      updatedProduct = { ...updatedProduct, image: publicURL }
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: updatedProduct,
    })

    imageFile.size && (await deleteImage(current_img))
    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: 'Product has been successfully updated' }
  } catch (error) {
    return renderError(error)
  }
}

export const getProductUserFavId = async (productId: string) => {
  const clerkId = await getAuthUser()
  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId,
    },
    select: {
      id: true,
    },
  })
  return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
  favId: string | null
  productId: string
  pathName: string
}): Promise<{ message: string }> => {
  const clerkId = await getAuthUser()
  const { favId, productId, pathName } = prevState
  try {
    if (favId) {
      await prisma.favorite.delete({
        where: {
          id: favId || undefined,
        },
      })
    } else {
      await prisma.favorite.create({
        data: {
          clerkId,
          productId,
        },
      })
    }
    revalidatePath(pathName)
    return {
      message: `Product has been successfully ${
        favId ? 'removed from' : 'added to'
      } your favorites`,
    }
  } catch (error) {
    return renderError(error)
  }
}

export const getUsersFavProducts = async () => {
  const clerkId = await getAuthUser()
  const products = await prisma.product.findMany({
    where: {
      favorites: {
        some: {
          clerkId,
        },
      },
    },
  })
  return products
}

export const addReview = async (prevState: any, formData: FormData) => {
  const clerkId = await getAuthUser()
  const productId = formData.get('productId') as string
  try {
    const rawData = Object.fromEntries(formData.entries())
    console.log(rawData)
    const validatedInputs: ReviewType = validateWithZodSchema(reviewSchema, {
      ...rawData,
      clerkId,
    })
    const review = await prisma.review.create({
      data: validatedInputs,
    })
    revalidatePath(`/products/${productId}`)
    return {
      message: 'Review has been successfully added',
    }
  } catch (error) {
    return renderError(error)
  }
}

export const getAllProductReviews = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reviews
}

export const getReviewId = async (productId: string) => {
  const clerk = await currentUser()
  if (!clerk) return null
  const review = await prisma.review.findFirst({
    where: {
      clerkId: clerk.id,
      productId,
    },
  })
  return review?.id || null
}

export const getUserReviews = async () => {
  const clerkId = await getAuthUser()
  const reviews = await prisma.review.findMany({
    where: {
      clerkId,
    },
    include: {
      product: true,
    },
  })
  return reviews
}

export const deleteReview = async (prevState: {
  id: string
}): Promise<{ message: string }> => {
  const id = prevState.id
  const userId = await getAuthUser()
  try {
    if (userId != id) throw new Error('You cannot delete this review')
    const review = await prisma.review.delete({
      where: {
        id,
      },
    })
    revalidatePath('/reviews')
    return { message: 'Review has been successfully Removed' }
  } catch (error) {
    return renderError(error)
  }
}

export const calculateReviewsRating = async (productId: string) => {
  const result = await prisma.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  })
  const count = result[0]?._count.rating || 0
  const averageRating = count == 0 ? 0 : result[0]?._avg.rating?.toFixed(1)
  return { count, rating: averageRating }
}

//=================Cart================
export const getCartItemsCount = async () => {
  const user = await currentUser()
  if (!user) return null
  const result = await prisma.cart.findFirst({
    where: {
      clerkId: user.id,
    },
    select: {
      itemsCount: true,
    },
  })
  return result?.itemsCount
}

export const fetchProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) throw new Error('Product is not found')
  return product
}

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
}

export const fetchOrCreateCart = async ({
  clerkId,
  errorOnFailure = false,
}: {
  clerkId: string
  errorOnFailure?: boolean
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId,
    },
    include: includeProductClause,
  })
  if (!cart && errorOnFailure) throw new Error('Cart not found')
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        clerkId,
      },
      include: includeProductClause,
    })
  }
  return cart
}

export const updateOrCreateCartItem = async ({
  cartId,
  productId,
  amount,
}: {
  cartId: string
  productId: string
  amount: number
}) => {
  const cartItem = await prisma.cartItem.upsert({
    where: { productId },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      cartId,
      productId,
      amount,
    },
  })
  return cartItem
}

export const updateCart = async ({ cart }: { cart: Cart }) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  })
  let itemsCount = 0
  let cartTotal = 0

  for (const item of cartItems) {
    itemsCount += item.amount
    cartTotal += item.amount * item.product.price
  }
  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping
  const updatedCart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      itemsCount,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  })
  return updatedCart
}

export const addToCartAction = async (prevState: {
  productId: string
  amount: number
}) => {
  try {
    const clerkId = await getAuthUser()
    const { productId, amount } = prevState
    const product = await fetchProduct(productId)
    const cart = await fetchOrCreateCart({ clerkId })
    await updateOrCreateCartItem({
      productId,
      cartId: cart.id,
      amount,
    })
    await updateCart({
      cart,
    })
    revalidatePath('/')
    return { message: 'Product has been successfully added to your cart' }
  } catch (error) {
    return renderError(error)
  }
}

export const removeCartItemAction = async (prevState: { id: string }) => {
  const clerkId = await getAuthUser()
  try {
    const cart = await fetchOrCreateCart({ clerkId, errorOnFailure: true })
    await prisma.cartItem.delete({
      where: {
        id: prevState.id,
        cartId: cart.id,
      },
    })
    await updateCart({ cart })
    revalidatePath('/cart')
    return { message: 'Item deleted' }
  } catch (error) {
    return renderError(error)
  }
}

export const updateCartItemAction = async ({
  id,
  amount,
}: {
  id: string
  amount: number
}) => {
  const clerkId = await getAuthUser()
  try {
    const cart = await fetchOrCreateCart({ clerkId, errorOnFailure: true })
    await prisma.cartItem.update({
      where: {
        id,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    })
    await updateCart({ cart })
    revalidatePath('/cart')
    return { message: 'Product amount has been successfully updated' }
  } catch (error) {
    return renderError(error)
  }
}

// ========= Orders ==================
export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await currentUser()
  if (!user) redirect('/')

  let orderId: string | null = null
  let cartId: string | null = null

  try {
    const cart = await fetchOrCreateCart({
      clerkId: user.id,
      errorOnFailure: true,
    })
    cartId = cart.id
    const order = await prisma.order.create({
      data: {
        clerkId: user.id,
        products: cart.itemsCount,
        orderTotal: cart.orderTotal,
        shipping: cart.shipping,
        tax: cart.tax,
        emailAddress: user.emailAddresses[0].emailAddress,
      },
    })
    orderId = order.id
  } catch (error) {
    return renderError(error)
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`)
}

export const getUserOrders = async (
  pageNumber: number = 1,
  itemPerPage: number = 10
) => {
  const clerkId = await getAuthUser()
  const orders = await prisma.order.findMany({
    where: {
      clerkId,
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: itemPerPage,
    skip: (pageNumber - 1) * itemPerPage,
  })
  return orders
}

export const getUserOrdersCount = async () => {
  const clerkId = await getAuthUser()
  return await prisma.order.count({
    where: {
      clerkId,
      isPaid: true,
    },
  })
}

export const fetchAdminOrders = async (
  pageNumber: number = 1,
  itemPerPage: number = 10
) => {
  await checkAuthorization()
  return await prisma.order.findMany({
    where: { isPaid: true },
    orderBy: { createdAt: 'desc' },
    take: itemPerPage,
    skip: (pageNumber - 1) * itemPerPage,
  })
}

export const getTotalOrdersNum = async () => {
  await checkAuthorization()
  return prisma.order.count({
    where: { isPaid: true },
  })
}

//============= Checkout =================
export const fetchClientSecret = async (orderId: string, cartId: string) => {
  const user = await currentUser()
  const origin = (await headers()).get('origin')
  const order = await prisma.order.findUnique({ where: { id: orderId } })
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: includeProductClause,
  })
  if (!order || !cart) return ''
  const line_items = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100,
        currency: 'usd',
      },
    }
  })
  const tax = {
    quantity: 1,
    price_data: {
      product_data: {
        name: 'Tax',
      },
      unit_amount: cart.tax * 100,
      currency: 'usd',
    },
  }
  const shipping = {
    quantity: 1,
    price_data: {
      product_data: {
        name: 'Shipping',
      },
      unit_amount: cart.shipping * 100,
      currency: 'usd',
    },
  }
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    metadata: { orderId, cartId },
    line_items: [...line_items, tax, shipping],
    mode: 'payment',
    billing_address_collection: 'required',
    customer_email: user?.emailAddresses[0].emailAddress,
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret as string
}
