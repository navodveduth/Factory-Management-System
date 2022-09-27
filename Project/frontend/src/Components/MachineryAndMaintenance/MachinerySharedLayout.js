import React from 'react'
import {Outlet} from 'react-router-dom'
import MachineryNavbar from './MachineryNavbar'

function MachineryharedLayout() {
  return (
    <div>
      <MachineryNavbar/>
      <Outlet />
     </div>
    
  )
}

export default MachineryharedLayout