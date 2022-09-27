import React from 'react'
import {Outlet} from 'react-router-dom'
import StockNavbar from './Navbar/StockNavbar';


function StockSharedLayout() {
  return (
    <div>
      <Outlet />
      <StockNavbar />
    </div>
    
  )
}

export default StockSharedLayout;