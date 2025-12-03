import React from 'react'
import { ViewParking } from '../components'

const AllParkingPage = () => {
    window.scrollTo({ top: 0 })
  return (
    <div style={{
        overflowX: 'hidden'
    }}>
        <ViewParking />
    </div>
  )
}

export default AllParkingPage