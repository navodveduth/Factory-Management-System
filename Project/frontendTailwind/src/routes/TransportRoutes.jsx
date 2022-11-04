import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DriverDashboard, DriverViewAll, DriverNew, DriverUpdate, DriverReport } from '../pages/Driver';
import { TransportDashboard, TransportViewAll, TransportNew, TransportUpdate, TransportReport } from '../pages/Transport';

function TransportRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/TransportDashboard" element={<TransportDashboard />} />
        <Route path="/TransportViewAll" element={<TransportViewAll />} />
        <Route path="/TransportCreate" element={<TransportNew />} />
        <Route path="/TransportUpdate/:id" element={<TransportUpdate />} />
        <Route path="/TransportReport" element={<TransportReport />} />

        <Route path="/DriverDashboard" element={<DriverDashboard />} />
        <Route path="/DriverViewAll" element={<DriverViewAll />} />
        <Route path="/DriverCreate" element={<DriverNew />} />
        <Route path="/DriverUpdate/:id" element={<DriverUpdate />} />
        <Route path="/DriverReport" element={<DriverReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default TransportRoutes;
