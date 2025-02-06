'use client'

import { ImageInput } from '@/components/form'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

const ImageContainer = ({
  alt,
  src,
  className,
}: {
  alt: string
  src: string
  className?: string
}) => {
  const [updateImage, setUpdateImage] = useState(false)
  const { pending } = useFormStatus()

  useEffect(() => {
    if (!pending) {
      setUpdateImage(false)
    }
  }, [pending])

  return (
    <div className={cn('', className)}>
      <div className="w-32 h-32 relative">
        <Image
          alt={alt}
          src={src}
          fill
          priority
          className="w-full h-32 object-cover rounded-md"
        />
      </div>
      <Button
        type="button"
        className="mt-3"
        onClick={() => setUpdateImage(!updateImage)}
      >
        {updateImage ? 'Cancel' : 'Change Image'}
      </Button>
      <div className={`${updateImage ? 'block' : 'hidden'}`}>
        <ImageInput required={updateImage} className="mt-4" labelText=" " />
      </div>
    </div>
  )
}
export default ImageContainer
