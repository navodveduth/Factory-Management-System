import React from 'react';
import {Outlet} from 'react-router-dom';
import DamagedStockNavbar from "./Navbar/DamagedStockNavbar";

function DamagedStockSharedLayout() {
  return (
    <div>
      <Outlet />
      <DamagedStockNavbar />
    </div>
    
  )
}

export default DamagedStockSharedLayout;