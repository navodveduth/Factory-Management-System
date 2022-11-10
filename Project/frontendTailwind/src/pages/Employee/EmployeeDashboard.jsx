import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiUsers, FiUserPlus } from 'react-icons/fi';
import { FaUsers, FaBoxes, FaUser } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md'
import { DashTopBox, DashTopButton, EmployeePieChart, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';



const EmployeeDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [employee, setEmployee] = useState([]);

  const getEmployee = () => {
    axios
      .get('http://localhost:8070/employee/viewEmployee')
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // const token = localStorage.getItem('userInfo');

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get('http://localhost:8070/employee/viewEmployee', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setEmployee(res.data);
  //       })
  //       .catch((err) => {
  //         alert(err.message.data);
  //       });
  //   } else {
  //     window.location.href = 'http://localhost:3000';
  //   }
  // }, [token]);

  useEffect(() => {
    getEmployee();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const empCount = employee.length;
  const empCountManager= employee.filter((emp) => emp.employeeDesignation === 'Manager').length;
  const empCountHR= employee.filter((emp) => emp.employeeDepartment === 'Human Resources').length;
  
  return (
    <div>

      {/* DON'T CHANGE ANYTHING HERE */}

        <div className={currentMode === 'Dark' ? 'dark' : ''}>

          <div className="flex relative dark:bg-main-dark-bg">

            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* THEME SETTINGS BUTTON */}
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


            {activeMenu ? ( // SIDEBAR IMPLEMENTATION
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
                </div>
            )}

            <div
                className={ // MAIN BACKGROUND IMPLEMENTATION
                activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
            >
                    
              {/* NAVBAR IMPLEMENTATION */}
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
              </div>

                <div>
                  {themeSettings && <ThemeSettings />}
                  <div>
                    {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                    {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                    {/* PART AFTER THE RETURN STATEMENT */}
                    <div className="mt-5">
                      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
                          <Link to="/EmployeeViewAll">
                            <DashTopButton value="All employees" icon={<FiUsers />} />
                          </Link>
                          <Link to="/EmployeeCreate">
                            <DashTopButton value="New Employee" icon={<FiUserPlus />} />
                          </Link>
                        </div>
                      </div>

                      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                          <Link to="/EmployeeViewAll">
                            <DashTopBox icon={<FaUsers />} label="Total Employees" data={empCount} />
                          </Link>
                          <DashTopBox icon={<FaBoxes />} label="Total Departments" data={empCountManager} />
                          <DashTopBox icon={<MdManageAccounts />} label="Total Managers" data={empCountManager} />
                          <DashTopBox icon={<FaUser />} label="HR Employees" data={empCountHR} />       
                        </div>
                      </div>

                      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                        <EmployeePieChart />
                      </div>

                    </div>
                  </div>
                  <Footer />
                </div>  
              </div>
            </div>
        </div>
    </div>
  );
};

export default EmployeeDashboard;