import { prisma } from '@/utils/db'
import { redirect } from 'next/navigation'

export const fetchFeaturedProducts = async () => {
  const products = await prisma.products.findMany({
    where: {
      featured: true,
    },
  })
  return products
}

export const fetchAllProducts = async (searchKey?: string) => {
  const products = prisma.products.findMany({
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
  })
  return products
}

export const getProductById = async (id: string) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  })
  if (!product) redirect('/')
  return product
}
