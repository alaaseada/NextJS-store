import { Suspense } from 'react'
import Container from '../global/Container'
import CartButton from './CartButton'
import LinksDropDown from './LinksDropDown'
import Logo from './Logo'
import NavSearch from './NavSearch'
import ThemeToggleButton from './ThemeToggleButton'

const Navbar = () => {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 flex-wrap py-8">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <ThemeToggleButton />
          <LinksDropDown />
        </div>
      </Container>
    </nav>
  )
}
export default Navbar
