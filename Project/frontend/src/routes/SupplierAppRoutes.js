import React from 'react'

import AddSupplierDetails from '../components/AddSupplierDetails'
import Home from '../components/Home'
import HomeSharedLayout from '../components/HomeSharedLayout'
import SupplierUpdate from '../components/SupplierUpdate'
import SupplierView from '../components/SupplierView'
import SupplierSharedLayout from '../components/SupplierSharedLayout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <>

        <Router>

            <Routes>
                <Route path="/" element={<HomeSharedLayout />} >
                <Route index element = {<Home />} />

                </Route>

                <Route path="/supplier" element={<SupplierSharedLayout />} >
                <Route index element = {<SupplierView />} />
                <Route path="addSupplierDetails" element={<AddSupplierDetails />} />
                <Route path="supplierUpdate/:id" element={<SupplierUpdate />} />

                </Route>

            </Routes>

        </Router>
        
        </>)
}

export default AppRoutes;

