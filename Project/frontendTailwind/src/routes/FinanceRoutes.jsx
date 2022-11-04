import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceDashboard, FinanceViewAll, FinanceNew, FinanceUpdate, FinancePreview, SalaryDashboard, SalaryNew, SalaryUpdate, SalaryViewAll } from '../pages/Finance';

function FinanceRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* finance management  */}
        <Route path="/FinanceDashboard" element={<FinanceDashboard />} />
        <Route path="/FinanceNew" element={<FinanceNew />} />
        <Route path="/FinanceViewAll" element={<FinanceViewAll />} />
        <Route path="/FinanceUpdate/:id" element={<FinanceUpdate />} />
        <Route path="/FinancePreview/" element={<FinancePreview />} />

        {/* salary management  */}

        <Route path="/SalaryDashboard" element={<SalaryDashboard />} />
        <Route path="/SalaryViewAll" element={<SalaryViewAll />} />
        <Route path="/SalaryNew" element={<SalaryNew />} />
        <Route path="/SalaryUpdate/:id" element={<SalaryUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default FinanceRoutes;
