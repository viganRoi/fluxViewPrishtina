import React from 'react'
import { ViewCommercial } from '../components'

const AllCommercialPage = () => {
  window.scrollTo({ top: 0 })
  return (
    <div style={{
      overflowX: 'hidden'
    }}>
      <ViewCommercial />
    </div>
  )
}

export default AllCommercialPage