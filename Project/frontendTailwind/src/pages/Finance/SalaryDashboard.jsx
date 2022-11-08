import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiUser } from 'react-icons/fi';
import {GiPayMoney} from 'react-icons/gi';
import {MdOutlinePayments} from 'react-icons/md';
import { DashTopBox, DashTopButton, SalaryBarChart } from '../../components';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const SalaryDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [sal, setSalary] = useState([]);

  const getSalary = async () => {
    axios
      .get('http://localhost:8070/salary/SalaryView')
      .then((res) => {
        setSalary(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSalary();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const salCount = sal.length;
  var salManagerCount = 0;


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
                          <div className="mt-5">
                          <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
                            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                              {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
                              <Link to="/SalaryViewAll">
                                <DashTopButton value="View Salary List" icon={<MdOutlinePayments/>}  />
                              </Link>
                              <Link to="/SalaryNew">
                                <DashTopButton value="Transfer Salary" icon={<GiPayMoney/>} />
                              </Link>
                            </div>
                          </div>

                          <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                              {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                              <DashTopBox icon={<FiUser />} label="Salaried Employee Count" data = {salCount} />
                              <DashTopBox icon={<FiUser />} label="Total Number of Managers" data="4" />     
                            </div>
                          </div>

                          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                <SalaryBarChart />
                            </div>
                        </div>
                          {/* PART AFTER THE RETURN STATEMENT */}
                          
                      </div>
                      <Footer />
                  </div>  
              </div>
          </div>
      </div>
  </div>
  );
};

export default SalaryDashboard;