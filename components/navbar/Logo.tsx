import Link from 'next/link'
import { SiBackstage } from 'react-icons/si'
import { Button } from '../ui/button'

const Logo = () => {
  return (
    <Button size={'icon'} asChild>
      <Link href={'/'}>
        <SiBackstage className="text-xl text-primary-foreground" />
      </Link>
    </Button>
  )
}
export default Logo
