import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MachineryDashboard, MachineryNew, MachineryUpdate, MachineryViewAll, MachineryReport, MaintenanceDashboard, MaintenanceNew, MaintenanceUpdate, MaintenanceViewAll, MaintainenceTask, MaintainenceReport } from '../pages/MachineryAndMaintenance';

function MachineryRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* machinery management  */}
        <Route path="/MachineryDashboard" element={<MachineryDashboard />} />
        <Route path="/MachineryViewAll" element={<MachineryViewAll />} />
        <Route path="/MachineryCreate" element={<MachineryNew />} />
        <Route path="/MachineryUpdate/:id" element={<MachineryUpdate />} />
        <Route path="/MachineryReport/" element={<MachineryReport />} />
        {/* maintenance management  */}
        <Route path="/MaintenanceDashboard" element={<MaintenanceDashboard />} />
        <Route path="/MaintenanceViewAll" element={<MaintenanceViewAll />} />
        <Route path="/MaintenanceCreate" element={<MaintenanceNew />} />
        <Route path="/MaintenanceUpdate/:id" element={<MaintenanceUpdate />} />
        <Route path="/MaintainenceTask/" element={<MaintainenceTask />} />
        <Route path="/MaintainenceReport" element={<MaintainenceReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MachineryRoutes;
