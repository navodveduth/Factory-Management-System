import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupplierDashboard, SupplierViewAll, SupplierUpdate, SupplierNew, SupplierRecordsDashboard, SupplierDetailsPreview } from '../pages/Suppliers';

function SupplierRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SupplierDashboard" element={<SupplierDashboard />} />
        <Route path="/SupplierViewAll" element={<SupplierViewAll />} />
        <Route path="/SupplierCreate" element={<SupplierNew />} />
        <Route path="/SupplierUpdate/:id" element={<SupplierUpdate />} />
        <Route path="/SupplierRecordsDashboard" element={<SupplierRecordsDashboard />} />
        <Route path="/SupplierDetailsPreview" element={<SupplierDetailsPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SupplierRoutes;
