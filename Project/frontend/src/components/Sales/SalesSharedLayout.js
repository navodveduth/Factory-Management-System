import React from 'react'
import {Outlet} from 'react-router-dom'
import SalesNavbar from './SalesNavbar'

function SalesSharedLayout() {
  return (
    <div>
        <SalesNavbar/>
        <Outlet/>
    </div>
  )
}

export default SalesSharedLayout;