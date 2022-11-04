import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';

function CommonRoutes() {
  return (

      <Routes>
        {/* Common dashboard */}
        <Route path="/" element={<EmployeeDashboard />} />
      </Routes>

  );
}

export default CommonRoutes;
