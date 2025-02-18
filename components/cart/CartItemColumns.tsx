import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

export const FirstColumn = ({
  image,
  title,
}: {
  image: string
  title: string
}) => {
  return (
    <div className="relative w-24 h-24 sm:h-32 sm:w-32">
      <Image
        alt={title}
        src={image}
        sizes={'fill'}
        fill
        priority
        className="w-full object-cover rounded"
      />
    </div>
  )
}

export const SecondColumn = ({
  title,
  company,
  id,
}: {
  title: string
  company: string
  id: string
}) => {
  return (
    <div className="sm:w-48">
      <Link href={`/products/${id}`} className="capitalize tracking-wider">
        <h3 className="hover:underline">{title}</h3>
      </Link>
      <h4 className="text-sm text-muted-foreground mt-2">{company}</h4>
    </div>
  )
}

export const FourthColumn = ({ price }: { price: number }) => {
  return (
    <p className="font-medium md:ml-auto">{formatCurrency(Number(price))}</p>
  )
}
