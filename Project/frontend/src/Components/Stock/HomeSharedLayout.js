import React from 'react'
import {Outlet} from 'react-router-dom'
import CommonNavbar from './Navbar/CommonNavbar'


function HomeSharedLayout() {
  return (
    <div>
      <Outlet />
      <CommonNavbar />
    </div>
    
  )
}

export default HomeSharedLayout;