import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StocksDashboard, StockView, StockAdd, StockUpdate, StockPDF, StockUtilisation, StockUtilUpdate, StockUtilPDF, DamagedStockDashboard, DamagedStockView, DamagedStockAdd, DamagedStockUpdate, DStockPDF } from '../pages/Stock';

function StockRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/StockDashboard" element={<StocksDashboard />} />
        <Route path="/StockView" element={<StockView />} />
        <Route path="/StockAdd" element={<StockAdd />} />
        <Route path="/StockUpdate/:id" element={<StockUpdate />} />
        <Route path="/generatePDF" element={<StockPDF />} />
        <Route path="/StockUtilisation" element={<StockUtilisation />} />
        <Route path="/StockUtilUpdate" element={<StockUtilUpdate />} />
        <Route path="/StockUtilPDF" element={<StockUtilPDF />} />

        <Route path="/DamagedStockDashboard" element={<DamagedStockDashboard />} />
        <Route path="/DamagedStockView" element={<DamagedStockView />} />
        <Route path="/DamagedStockAdd" element={<DamagedStockAdd />} />
        <Route path="/DamagedStockUpdate/:id" element={<DamagedStockUpdate />} />
        <Route path="/generatePDF" element={<DStockPDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default StockRoutes;
