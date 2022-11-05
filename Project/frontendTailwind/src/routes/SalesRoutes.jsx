import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SalesDashboard, SalesPreview, SalesViewAll, SalesUpdate, SalesNew, SalesInvoice } from '../pages/Sales';

function SalesRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SalesDashboard" element={<SalesDashboard />} />
        <Route path="/SalesViewAll" element={<SalesViewAll />} />
        <Route path="/SalesCreate" element={<SalesNew />} />
        <Route path="/SalesUpdate/:id" element={<SalesUpdate />} />
        <Route path="/SalesInvoice/:id" element={<SalesInvoice />} />
        <Route path="/SalesPreview" element={<SalesPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SalesRoutes;
