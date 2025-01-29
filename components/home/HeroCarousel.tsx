'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import hero1 from '@/public/images/hero1.jpg'
import hero2 from '@/public/images/hero2.jpg'
import hero3 from '@/public/images/hero3.jpg'
import hero4 from '@/public/images/hero4.jpg'

const images = [hero1, hero2, hero3, hero4]

const HeroCarousel = () => {
  return (
    <Carousel
      className="w-full cursor-pointer hidden lg:block"
      plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
    >
      <CarouselContent>
        {images.map((image, index) => {
          return (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="p-2">
                  <Image
                    priority
                    className="w-full h-[24rem] object-cover rounded-md"
                    src={image}
                    sizes="fill"
                    width={0}
                    height={0}
                    alt={`hero-${index}`}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
export default HeroCarousel
