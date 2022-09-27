import React from 'react'
import {Outlet} from 'react-router-dom'
import FinanceNavBar from './FinanceNavBar.js'

function FinanceSharedLayout() {
  return (
    <div>
      <FinanceNavBar/>
      <Outlet />
     </div>
    
  )
}

export default FinanceSharedLayout