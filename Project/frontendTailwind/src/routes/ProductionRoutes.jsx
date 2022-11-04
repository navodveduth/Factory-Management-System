import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrderViewAll, ProductionDashBoard, AddOrder, UpdateOrder, PreviewOrder } from '../pages/Production/Index';

function ProductionRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vieworders" element={<OrderViewAll />} />
        <Route path="/production" element={<ProductionDashBoard />} />
        <Route path="/newOrder" element={<AddOrder />} />
        <Route path="/updateCost/:id" element={<UpdateOrder />} />
        <Route path="/costpreview" element={<PreviewOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ProductionRoutes;
