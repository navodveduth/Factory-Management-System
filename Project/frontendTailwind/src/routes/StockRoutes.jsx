import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StocksDashboard, StockView, StockAdd, StockUpdate, StockPDF, StockBreakdown, StockBreakdownUpdate, StockBreakdownPDF, StockUtilisationDashboard, StockUtilisation, StockAddExisting, StockUtilUpdate, StockUtilPDF, DamagedStockDashboard, DamagedStockView, DamagedStockAdd, DamagedStockUpdate, DStockPDF, PendingStockView, PendingStockAdd, PendingStockUpdate, PendingStockPDf } from './pages/Stock';

function StockRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* stock management  */}
        <Route path="/StockDashboard" element={<StocksDashboard />} />
          <Route path="/StockView" element={<StockView />} />
          <Route path="/StockAdd" element={<StockAdd />} />
          <Route path="/StockUpdate/:id" element={<StockUpdate />} />
          <Route path="/generateSPDF" element={<StockPDF />} />

          <Route path="/StockBreakdown" element={<StockBreakdown/>} />
          <Route path="/StockBreakdownUpdate/:id" element={<StockBreakdownUpdate/>} />
          <Route path="/generateSBPDF" element={<StockBreakdownPDF/>} />
          
          <Route path="/PendingStockView" element={<PendingStockView />} />
          <Route path="PendingStockAdd" element={<PendingStockAdd />} />
          <Route path="PendingStockUpdate/:id" element={<PendingStockUpdate />} />
          <Route path="/generatePSPDF" element={<PendingStockPDf />}/>

          <Route path="/StockUtilisationDashboard" element={<StockUtilisationDashboard/>} />
          <Route path="/StockUtilisation" element={<StockUtilisation />} />
          <Route path="/StockAddExisting" element={<StockAddExisting />} />
          <Route path="/StockUtilUpdate/:id" element={<StockUtilUpdate />} />
          <Route path="/generateSUPDF" element={<StockUtilPDF />} />

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
