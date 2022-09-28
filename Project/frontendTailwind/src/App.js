import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { EmployeeDashboard, Employees, EmployeeViewAll, EmployeeUpdate, EmployeeNew } from './pages';
import { AttendanceAndLeaveDashboard, AttendanceViewAll, AttendanceUpdate, AttendanceNew } from './pages';
import { LeaveViewAll, LeaveUpdate, LeaveNew } from './pages';

// minod





// chanukya





// navod





// shafa






// janindu






// devinya






// devindu
import { OrderViewAll,ProductionDashBoard,AddOrder, UpdateOrder, PreviewOrder} from './pages/Production/Index';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

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
            <TooltipComponent
              content="Settings"
              position="Top"
            >
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
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<EmployeeDashboard />)} />

                {/* employee management  */}
                <Route path="/EmployeeDashboard" element={<EmployeeDashboard/>} />
                <Route path="/EmployeeViewAll" element={<EmployeeViewAll/>} />
                <Route path="/EmployeeCreate" element={<EmployeeNew/>} />
                <Route path="/EmployeeUpdate/:id" element={<EmployeeUpdate/>} />

                {/* attendance management  */}
                <Route path="/AttendanceAndLeaveDashboard" element={<AttendanceAndLeaveDashboard />} />
                <Route path="/AttendanceViewAll" element={<AttendanceViewAll />} />
                <Route path="/AttendanceCreate" element={<AttendanceNew />} />
                <Route path="/AttendanceUpdate/:id" element={<AttendanceUpdate />} />
                  
                {/* leave management  */}
                <Route path="/LeaveViewAll" element={<LeaveViewAll />} />
                <Route path="/LeaveCreate" element={<LeaveNew />} />
                <Route path="/LeaveUpdate/:id" element={<LeaveUpdate />} />

                {/* finanace management  */}







                {/* salary management  */}







                {/* sales management  */}







                {/* machinery management  */}






                {/* maintenance management  */}







                {/* production management  */}
                <Route path="/vieworders" element={<OrderViewAll/>} />
                <Route path="/production" element={<ProductionDashBoard/>} />
                <Route path='/newOrder' element={<AddOrder/>}/>
                <Route path='/updateCost/:id' element={<UpdateOrder/>}/>
                <Route path='/costpreview' element ={<PreviewOrder/>}/>

                {/* stocks management  */}







                 {/* damaged stocks management  */}







                 {/* transportation management  */}








                  {/* driver management  */}







                  {/* supplier management  */}








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
