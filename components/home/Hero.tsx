import HeroCarousel from './HeroCarousel'
import Link from 'next/link'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl capitalize mb-8 tracking-wider sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className=" max-w-xl text-muted-foreground font-normal leading-8">
          <span className="font-semibold italic">
            "Transform Your Space with Stylish, Quality Furniture – Where
            Comfort Meets Design!" &nbsp;
          </span>
          <span className="font-light">
            At our furniture store, we believe that your home should be a
            reflection of your unique style and comfort. That’s why we offer a
            wide range of high-quality, stylish furniture designed to suit every
            taste and need.
          </span>
        </p>
        <div className="mt-10">
          <Button size={'lg'} asChild>
            <Link href={'/products'} className="capitalize tracking-wider">
              Our products
            </Link>
          </Button>
        </div>
      </div>
      <HeroCarousel />
    </section>
  )
}
export default Hero
