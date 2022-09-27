import React from 'react'

import {Outlet} from 'react-router-dom'

import SupplierNavbar from './SupplierNavbar'



function SupplierSharedLayout() {

  return (

    <div>

        <SupplierNavbar/>

        <Outlet/>

    </div>

  )

}



export default SupplierSharedLayout;