import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
//import { CommonRoutes, EmployeeRoutes, FinanceRoutes, MachineryRoutes, ProductionRoutes, SalesRoutes, StockRoutes, SupplierRoutes, TransportRoutes } from './routes'

import { EmployeeDashboard, EmployeeViewAll, EmployeeNew, EmployeeUpdate, EmployeeReport, EmployeeProfile } from './pages/Employee';
import { AttendanceAndLeaveDashboard, AttendanceViewAll, AttendanceNew, AttendanceUpdate, AttendanceReport, AttendanceNewRecord, LeaveViewAll, LeaveNew, LeaveUpdate, LeaveReport } from './pages/AttendanceAndLeaves';
import { WelfareDashboard, WelfareNew, WelfareReport, WelfareUpdate, WelfareViewAll } from './pages/Welfare';

import { FinanceDashboard, FinanceViewAll, FinanceNew, FinanceUpdate, FinancePreview, SalaryDashboard, SalaryNew, SalaryUpdate, SalaryViewAll, PreviewSalary, FinanceDateRange } from './pages/Finance';

import {  MaintenanceDashboard, MaintenanceNew, MaintenanceUpdate, MaintenanceViewAll, MaintainenceTask, MaintainenceReport,MaintainenceDateRange, MachMaintenanceViewAll,MachMaintenanceNew,MachMaintenanceUpdate,MachManitenanceDateRange,MachMaintenanceReport,VehiMaintenanceViewAll,VehiMaintenanceNew, VehiMaintenanceUpdate, VehiMaintenanceReport,VehiMaintenanceDateRange} from './pages/Maintenance';
import {MachineryDashboard, MachineryNew, MachineryUpdate, MachineryViewAll, MachineryReport, MachineryDateRange, MachMaintenanceHistory} from './pages//Machinery';
import { SalesDashboard, SalesPreview, SalesViewAll, SalesUpdate, SalesNew, SalesInvoice, SalesDateRange } from './pages/Sales';

import { OrderViewAll, ProductionDashBoard, AddOrder, UpdateOrder, PreviewOrder } from './pages/Production/Index';

import { StocksDashboard, StockView, StockAdd, StockUpdate, StockPDF, StockBreakdown, StockBreakdownUpdate, StockBreakdownPDF, StockUtilisationDashboard, StockUtilisation, StockAddExisting, StockUtilUpdate, StockUtilPDF, DamagedStockDashboard, DamagedStockView, DamagedStockAdd, DamagedStockUpdate, DStockPDF, PendingStockView, PendingStockAdd, PendingStockUpdate, PendingStockPDf } from './pages/Stock';

import { SupplierDashboard, SupplierViewAll, SupplierUpdate, SupplierNew, PurchaseOrderDetailsDashboard, SupplierDetailsPreview, PurchaseOrderAdd, PurchaseOrderUpdate, PurchaseOrderPreview, PurchaseOrderView } from './pages/Suppliers';

import { DriverDashboard, DriverViewAll, DriverNew, DriverUpdate, DriverReport } from './pages/Driver';
import { TransportDashboard, TransportViewAll, TransportNew, TransportUpdate, TransportReport } from './pages/Transport';

import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration'


import { CustomerNew,CustomerViewAll,CustomerUpdate,CustomerDashboard } from './pages/Customer';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<EmployeeDashboard />} /> 
          

          {/* employee management  */}
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/EmployeeViewAll" element={<EmployeeViewAll />} />
          <Route path="/EmployeeCreate" element={<EmployeeNew />} />
          <Route path="/EmployeeUpdate/:id" element={<EmployeeUpdate />} />
          <Route path="/EmployeeReport" element={<EmployeeReport />} />
          <Route path="/EmployeeProfile/:id" element={<EmployeeProfile />} />

          {/* attendance management  */}
          <Route path="/AttendanceAndLeaveDashboard" element={<AttendanceAndLeaveDashboard />} />
          <Route path="/AttendanceViewAll" element={<AttendanceViewAll />} />
          <Route path="/AttendanceCreate" element={<AttendanceNew />} />
          <Route path="/AttendanceUpdate/:id" element={<AttendanceUpdate />} />
          <Route path="/AttendanceReport" element={<AttendanceReport />} />
          <Route path="/AttendanceNewRecord" element={<AttendanceNewRecord />} />

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

          {/* finance management  */}
          <Route path="/FinanceDashboard" element={<FinanceDashboard />} />
          <Route path="/FinanceNew" element={<FinanceNew />} />
          <Route path="/FinanceViewAll" element={<FinanceViewAll />} />
          <Route path="/FinanceUpdate/:id" element={<FinanceUpdate />} />
          <Route path="/FinancePreview/" element={<FinancePreview />} />
          <Route path="/FinanceDateRange/" element={<FinanceDateRange />} />\

          {/* salary management  */}
          <Route path="/SalaryDashboard" element={<SalaryDashboard />} />
          <Route path="/SalaryViewAll" element={<SalaryViewAll />} />
          <Route path="/SalaryNew" element={<SalaryNew />} />
          <Route path="/SalaryUpdate/:id" element={<SalaryUpdate />} />
          <Route path="/SalaryPreview" element={<PreviewSalary />} />


          {/* machinery management  */}
          <Route path="/MachineryDashboard" element={<MachineryDashboard />} />
          <Route path="/MachineryViewAll" element={<MachineryViewAll />} />
          <Route path="/MachineryCreate" element={<MachineryNew />} />
          <Route path="/MachineryUpdate/:id" element={<MachineryUpdate />} />
          <Route path="/MachineryReport/" element={<MachineryReport />} />
          <Route path="/MachineryDateRange/" element={<MachineryDateRange />} />
          <Route path="/MachMaintenanceHistory/:id" element={<MachMaintenanceHistory />} />

          {/* maintenance management  */}
          <Route path="/MaintenanceDashboard" element={<MaintenanceDashboard />} />
          <Route path="/MaintenanceViewAll" element={<MaintenanceViewAll />} />
          <Route path="/MaintenanceCreate" element={<MaintenanceNew />} />
          <Route path="/MaintenanceUpdate/:id" element={<MaintenanceUpdate />} />
          <Route path="/MaintainenceTask/" element={<MaintainenceTask />} />
          <Route path="/MaintainenceReport" element={<MaintainenceReport />} />
          <Route path="/MaintainenceDateRange" element={<MaintainenceDateRange />} />
          <Route path="/MachMaintenanceViewAll" element={<MachMaintenanceViewAll />} />
          <Route path="/MachMaintenanceNew" element={<MachMaintenanceNew />} />
          <Route path="/MachMaintenanceUpdate/:id" element={<MachMaintenanceUpdate />} />
          <Route path="/MachMaintenanceReport" element={<MachMaintenanceReport />} />
          <Route path="/MachManitenanceDateRange/" element={<MachManitenanceDateRange />} />
          <Route path="/VehiMaintenanceViewAll" element={<VehiMaintenanceViewAll />} />
          <Route path="/VehiMaintenanceNew" element={<VehiMaintenanceNew />} />
          <Route path="/VehiMaintenanceUpdate/:id" element={<VehiMaintenanceUpdate />} />
          <Route path="/VehiMaintenanceReport" element={<VehiMaintenanceReport />} />
          <Route path="/VehiMaintenanceDateRange/" element={<VehiMaintenanceDateRange />} />
                
          {/* sales management  */}
          <Route path="/SalesDashboard" element={<SalesDashboard />} />
          <Route path="/SalesViewAll" element={<SalesViewAll />} />
          <Route path="/SalesCreate" element={<SalesNew />} />
          <Route path="/SalesUpdate/:id" element={<SalesUpdate />} />
          <Route path="/SalesInvoice/:id" element={<SalesInvoice />} />
          <Route path="/SalesPreview" element={<SalesPreview />} />
          <Route path="/SalesDateRange" element={<SalesDateRange />} />

          {/* production management  */}
          <Route path="/vieworders" element={<OrderViewAll />} />
          <Route path="/production" element={<ProductionDashBoard />} />
          <Route path="/newOrder" element={<AddOrder />} />
          <Route path="/updateCost/:id" element={<UpdateOrder />} />
          <Route path="/costpreview" element={<PreviewOrder />} />

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

          {/* Supplier management  */}
          <Route path="/SupplierDashboard" element={<SupplierDashboard />} />
          <Route path="/SupplierViewAll" element={<SupplierViewAll />} />
          <Route path="/SupplierCreate" element={<SupplierNew />} />
          <Route path="/SupplierUpdate/:id" element={<SupplierUpdate />} />
          <Route path="/PurchaseOrderDetailsDashboard" element={<PurchaseOrderDetailsDashboard />} />
          <Route path="/SupplierDetailsPreview" element={<SupplierDetailsPreview />} />

          {/* Purchase Order management  */}
         
        <Route path="/PurchaseOrderAdd" element={<PurchaseOrderAdd />} />
        <Route path="/PurchaseOrderUpdate/:id" element={<PurchaseOrderUpdate />} />
        <Route path="/PurchaseOrderView" element={<PurchaseOrderView />} />
        <Route path="/PurchaseOrderPreview" element={<PurchaseOrderPreview />} />

          {/* Transport management  */}
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

          {/* customer management  */}
          <Route path="/CustomerViewAll" element={<CustomerViewAll />} />
          <Route path="/CustomerCreate" element={<CustomerNew />} />
          <Route path="/CustomerUpdate/:id" element={<CustomerUpdate />} />
          <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
          
        </Routes>
      </BrowserRouter>
        
    </div>
  );
};

export default App;
