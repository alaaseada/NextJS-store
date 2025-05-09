'use client'

import LoadingTable from '@/components/global/LoadingTable'
import SectionTitle from '@/components/global/SectionTitle'

const loading = () => {
  return (
    <>
      <SectionTitle title="Your Orders" />
      <LoadingTable />
    </>
  )
}
export default loading
