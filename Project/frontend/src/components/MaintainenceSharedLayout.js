import React from 'react'
import {Outlet} from 'react-router-dom'
import MaintainenceNavbar from './MaintainenceNavbar'

function MaintainenceSharedLayout() {
  return (
    <div>
      <MaintainenceNavbar/>
      <Outlet />
     
    </div>
    
  )
}

export default MaintainenceSharedLayout