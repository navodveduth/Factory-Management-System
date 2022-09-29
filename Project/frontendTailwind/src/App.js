import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import {
  EmployeeDashboard,
  Employees,
  EmployeeViewAll,
  EmployeeUpdate,
  EmployeeNew,
} from './pages';
import {
  AttendanceAndLeaveDashboard,
  AttendanceViewAll,
  AttendanceUpdate,
  AttendanceNew,
} from './pages';
import { LeaveViewAll, LeaveUpdate, LeaveNew } from './pages';

// minod

import {
  FinanceNew,
  FinanceDashboard,
  FinanceViewAll,
  FinanceUpdate,
} from './pages';
import { SalaryDashboard } from './pages';

// chanukya

import {
  MachineryDashboard,
  MachineryNew,
  MachineryUpdate,
  MachineryViewAll,
} from './pages/MachineryAndMaintenance';
import {
  MaintenanceDashboard,
  MaintenanceNew,
  MaintenanceUpdate,
  MaintenanceViewAll,
  MaintainenceTask,
} from './pages/MachineryAndMaintenance';

// navod
import {
  TransportDashboard,
  TransportViewAll,
  TransportNew,
  TransportUpdate,
  DriverDashboard,
  DriverViewAll,
  DriverNew,
  DriverUpdate,
} from './pages';
// shafa
import {StocksDashboard, StockView, StockAdd, StockUpdate, StockPDF, StockUtilisation, StockUtilUpdate} from './pages';
import {DamagedStockDashboard, DamagedStockView, DamagedStockAdd, DamagedStockUpdate, DStockPDF} from './pages';




// janindu
import {
  SalesDashboard, SalesPreview,
  SalesViewAll,
  SalesUpdate,
  SalesNew,
  SalesInvoice,
} from './pages';

// devinya

import {
  SupplierDashboard,
  SupplierViewAll,
  SupplierUpdate,
  SupplierNew,
  SupplierRecordsDashboard,

} from './pages';

// devindu
import {
  OrderViewAll,
  ProductionDashBoard,
  AddOrder,
  UpdateOrder,
  PreviewOrder,
} from './pages/Production/Index';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<EmployeeDashboard />} />

                {/* employee management  */}
                <Route
                  path="/EmployeeDashboard"
                  element={<EmployeeDashboard />}
                />
                <Route path="/EmployeeViewAll" element={<EmployeeViewAll />} />
                <Route path="/EmployeeCreate" element={<EmployeeNew />} />
                <Route
                  path="/EmployeeUpdate/:id"
                  element={<EmployeeUpdate />}
                />

                {/* attendance management  */}
                <Route
                  path="/AttendanceAndLeaveDashboard"
                  element={<AttendanceAndLeaveDashboard />}
                />
                <Route
                  path="/AttendanceViewAll"
                  element={<AttendanceViewAll />}
                />
                <Route path="/AttendanceCreate" element={<AttendanceNew />} />
                <Route
                  path="/AttendanceUpdate/:id"
                  element={<AttendanceUpdate />}
                />

                {/* leave management  */}
                <Route path="/LeaveViewAll" element={<LeaveViewAll />} />
                <Route path="/LeaveCreate" element={<LeaveNew />} />
                <Route path="/LeaveUpdate/:id" element={<LeaveUpdate />} />

                {/* finanace management  */}

                <Route
                  path="/FinanceDashboard"
                  element={<FinanceDashboard />}
                />
                <Route path="/FinanceNew" element={<FinanceNew />} />
                <Route path="/FinanceViewAll" element={<FinanceViewAll />} />
                <Route path="/FinanceUpdate/:id" element={<FinanceUpdate />} />

                <Route path="/SalaryDashboard" element={<SalaryDashboard />} />

                {/* salary management  */}

                {/* sales management  */}
                <Route path="/SalesDashboard" element={<SalesDashboard />} />
                <Route path="/SalesViewAll" element={<SalesViewAll />} />
                <Route path="/SalesCreate" element={<SalesNew />} />
                <Route path="/SalesUpdate/:id" element={<SalesUpdate />} />
                <Route path="/SalesInvoice/:id" element={<SalesInvoice />} />
                <Route path="/SalesPreview" element={<SalesPreview />} />
                {/* machinery management  */}
                <Route
                  path="/MachineryDashboard"
                  element={<MachineryDashboard />}
                />
                <Route
                  path="/MachineryViewAll"
                  element={<MachineryViewAll />}
                />
                <Route path="/MachineryCreate" element={<MachineryNew />} />
                <Route
                  path="/MachineryUpdate/:id"
                  element={<MachineryUpdate />}
                />

                {/* maintenance management  */}
                <Route
                  path="/MaintenanceDashboard"
                  element={<MaintenanceDashboard />}
                />
                <Route
                  path="/MaintenanceViewAll"
                  element={<MaintenanceViewAll />}
                />
                <Route path="/MaintenanceCreate" element={<MaintenanceNew />} />
                <Route
                  path="/MaintenanceUpdate/:id"
                  element={<MaintenanceUpdate />}
                />
                <Route path="/MaintainenceTask/" element={<MaintainenceTask />} />

                {/* production management  */}
                <Route path="/vieworders" element={<OrderViewAll />} />
                <Route path="/production" element={<ProductionDashBoard />} />
                <Route path="/newOrder" element={<AddOrder />} />
                <Route path="/updateCost/:id" element={<UpdateOrder />} />
                <Route path="/costpreview" element={<PreviewOrder />} />

                {/* stocks management  */}
                <Route path="/StockDashboard" element={<StocksDashboard />}/>
                <Route path="/StockView" element={<StockView />} />
                <Route path="/StockAdd" element={<StockAdd />} />
                <Route path="/StockUpdate/:id" element={<StockUpdate />} />
                <Route path="/generatePDF" element={<StockPDF/>} />
                <Route path ="/StockUtilisation" element={<StockUtilisation/>} />
                <Route path ="/StockUtilUpdate" element={<StockUtilUpdate/>} />



                 {/* damaged stocks management  */}
                <Route path ="/DamagedStockDashboard" element={<DamagedStockDashboard/>} />
                <Route path ="/DamagedStockView" element={<DamagedStockView/>} />
                <Route path ="/DamagedStockAdd" element={<DamagedStockAdd/>} />
                <Route path="/DamagedStockUpdate/:id" element={<DamagedStockUpdate/>} />
                <Route path="/generatePDF" element={<DStockPDF/>} />


                 {/* transportation management  */}
                 <Route path="/TransportDashboard" element={<TransportDashboard />}/>
                <Route path="/TransportViewAll" element={<TransportViewAll />} />
                <Route path="/TransportCreate" element={<TransportNew />} />
                <Route  path="/TransportUpdate/:id" element={<TransportUpdate />} />







                  {/* driver management  */}
                  <Route path="/DriverDashboard" element={<DriverDashboard />} />
                <Route path="/DriverViewAll" element={<DriverViewAll />} />
                <Route path="/DriverCreate" element={<DriverNew />} />
                <Route path="/DriverUpdate/:id" element={<DriverUpdate />} />






                  {/* supplier management  */}
                  <Route path="/SupplierDashboard" element={<SupplierDashboard />}/>
                <Route path="/SupplierViewAll" element={<SupplierViewAll />} />
                <Route path="/SupplierCreate" element={<SupplierNew />} />
                <Route path="/SupplierUpdate/:id" element={<SupplierUpdate />}/>
                <Route path="/SupplierRecordsDashboard" element={<SupplierRecordsDashboard />}/>


              
              </Routes>
            </div>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
