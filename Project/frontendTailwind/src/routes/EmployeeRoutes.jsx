import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmployeeDashboard, EmployeeViewAll, EmployeeNew, EmployeeUpdate, EmployeeReport } from '../pages/Employee';
import { AttendanceAndLeaveDashboard, AttendanceViewAll, AttendanceNew, AttendanceUpdate, AttendanceReport, LeaveViewAll, LeaveNew, LeaveUpdate, LeaveReport } from '../pages/AttendanceAndLeaves';
import { WelfareDashboard, WelfareNew, WelfareReport, WelfareUpdate, WelfareViewAll } from '../pages/Welfare';

function EmployeeRoutes() {
  return (

      <Routes>
        {/* employee management  */}
        

        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/EmployeeViewAll" element={<EmployeeViewAll />} />
        <Route path="/EmployeeCreate" element={<EmployeeNew />} />
        <Route path="/EmployeeUpdate/:id" element={<EmployeeUpdate />} />
        <Route path="/EmployeeReport" element={<EmployeeReport />} />

        {/* attendance management  */}
        <Route path="/AttendanceAndLeaveDashboard" element={<AttendanceAndLeaveDashboard />} />
        <Route path="/AttendanceViewAll" element={<AttendanceViewAll />} />
        <Route path="/AttendanceCreate" element={<AttendanceNew />} />
        <Route path="/AttendanceUpdate/:id" element={<AttendanceUpdate />} />
        <Route path="/AttendanceReport" element={<AttendanceReport />} />

        {/* leave management  */}
        <Route path="/LeaveViewAll" element={<LeaveViewAll />} />
        <Route path="/LeaveCreate" element={<LeaveNew />} />
        <Route path="/LeaveUpdate/:id" element={<LeaveUpdate />} />
        <Route path="/LeaveReport" element={<LeaveReport />} />

        {/* welfare management */}
        <Route path="/WelfareDashboard" element={<WelfareDashboard />} />
        <Route path="/WelfareViewAll" element={<WelfareViewAll />} />
        <Route path="/WelfareCreate" element={<WelfareNew />} />
        <Route path="/WelfareUpdate/:id" element={<WelfareUpdate />} />
        <Route path="/WelfareReport" element={<WelfareReport />} />
      </Routes>

  );
}

export default EmployeeRoutes;
