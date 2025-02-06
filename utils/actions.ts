'use server'

import { prisma } from '@/utils/db'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import {
  imageSchema,
  productSchema,
  validateWithZodSchema,
} from './types_schemas'
import { uploadImage, deleteImage } from './supabase'
import { revalidatePath } from 'next/cache'
import { UpdatedProductType } from './types_schemas'

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
  itemPerPage: number = 6
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
  productId: string
}): Promise<{ message: string }> => {
  await checkAuthorization()
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: prevState.productId,
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
  itemPerPage: number = 6
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
