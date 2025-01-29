import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6'

const AboutPage = () => {
  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="absolute inset-0 bg-[url(/images/about-us.jpg)] bg-center bg-cover opacity-10 z-0 rounded"></div>
      <div className="relative z-10 tracking-wider grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 p-10 items-center place-items-center">
        <h2 className="uppercase text-4xl lg:text-6xl max-w-sm text-center drop-shadow-md">
          About Us
        </h2>
        <div className="relative">
          <p className="leading-8 text-center">
            Welcome to NEXT Store, where style meets comfort and innovation. We
            are a modern furniture store dedicated to bringing you the latest
            trends and timeless designs to transform your space. Whether you're
            furnishing your home, office, or outdoor area, we offer a carefully
            curated selection of high-quality pieces that blend form and
            function. Our mission is to make your living spaces reflect your
            personality, offering unique, sustainable, and stylish furniture
            solutions that fit seamlessly into any lifestyle. At [Store Name],
            we believe that great design enhances life, and we're here to help
            you create the perfect environment to live, work, and relax.
          </p>
          <div className="mt-10 flex max-w-sm gap-4 mx-auto items-center justify-center">
            <Link href={'https://www.facebook.com'}>
              <FaFacebook size={25} />
            </Link>
            <Link href={'https://www.twitter.com'}>
              <FaTwitter size={25} />
            </Link>
            <Link href={'https://www.instagram.com'}>
              <FaInstagram size={25} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutPage
