import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupplierDashboard, SupplierViewAll, SupplierUpdate, SupplierNew, PurchaseOrderDetailsDashboard, SupplierDetailsPreview, PurchaseOrderAdd, PurchaseOrderUpdate, PurchaseOrderPreview, PurchaseOrderView  } from '../pages/Suppliers';

function SupplierRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SupplierDashboard" element={<SupplierDashboard />} />
        <Route path="/SupplierViewAll" element={<SupplierViewAll />} />
        <Route path="/SupplierCreate" element={<SupplierNew />} />
        <Route path="/SupplierUpdate/:id" element={<SupplierUpdate />} />
        <Route path="/PurchaseOrderDetailsDashboard" element={<PurchaseOrderDetailsDashboard />} />
        <Route path="/SupplierDetailsPreview" element={<SupplierDetailsPreview />} />

        <Route path="/PurchaseOrderDetailsDashboard" element={<PurchaseOrderDetailsDashboard />} />
        <Route path="/PurchaseOrderAdd" element={<PurchaseOrderAdd />} />
        <Route path="/PurchaseOrderUpdate/:id" element={<PurchaseOrderUpdate />} />
        <Route path="/PurchaseOrderView" element={<PurchaseOrderView />} />
        <Route path="/PurchaseOrderPreview" element={<PurchaseOrderPreview />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default SupplierRoutes;
