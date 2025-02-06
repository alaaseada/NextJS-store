'use client'
import { Input } from '../ui/input'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, ChangeEvent } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const NavSearch = () => {
  const searchParams = useSearchParams()
  const [searchKey, setSearchKey] = useState(
    searchParams.get('searchKey')?.toString() || ''
  )
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('searchKey', value)
      if (params.get('page')) params.delete('page')
    } else {
      params.delete('searchKey')
    }
    replace(`/products?${params.toString()}`)
  }, 500)

  useEffect(() => {
    if (!searchParams.get('searchKey')) {
      setSearchKey('')
    }
  }, [searchParams])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchKey(value)
    handleSearch(value)
  }
  return (
    <Input
      placeholder="Search products...."
      type="search"
      name="searchKey"
      id="searchKey"
      className="max-w-xs dark:bg-muted"
      value={searchKey}
      onChange={handleChange}
    />
  )
}
export default NavSearch
