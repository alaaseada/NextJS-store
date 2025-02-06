type Link = {
  id: string
  href: string
  label: string
}

export const Links: Link[] = [
  { id: '1', href: '/', label: 'Home' },
  { id: '2', href: '/about', label: 'About' },
  { id: '3', href: '/cart', label: 'Cart' },
  { id: '4', href: '/favorites', label: 'Favorites' },
  { id: '5', href: '/orders', label: 'Orders' },
  { id: '6', href: '/products', label: 'Products' },
  { id: '7', href: '/reviews', label: 'Reviews' },
  { id: '8', href: '/admin/products', label: 'Dashboard' },
]

export const AdminLinks: Link[] = [
  { id: '1', href: '/admin/sales', label: 'Sales' },
  { id: '2', href: '/admin/products', label: 'My products' },
  { id: '3', href: '/admin/products/create', label: 'Add Product' },
]
