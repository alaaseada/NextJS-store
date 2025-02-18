import SideMenu from '@/components/admin/SideMenu'
import SectionTitle from '@/components/global/SectionTitle'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SectionTitle title="Dashboard" cssClass="text-xl mb-2" />
      <div className="grid gap-y-6 md:grid-cols-12 mt-2">
        <div className="md:col-span-2">
          <SideMenu />
        </div>
        <div className="md:col-span-10">{children}</div>
      </div>
    </>
  )
}
export default layout
