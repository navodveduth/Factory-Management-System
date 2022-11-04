import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { HiUserGroup } from 'react-icons/hi';
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  DashTopBox,
  DashTopButton,
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';

const DriverDashboard = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [driver, setDriver] = useState([]);

  const getDriver = async () => {
    axios
      .get('http://localhost:8070/driver/')
      .then((res) => {
        setDriver(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDriver();
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const totDrivers = driver.length;
  const available = driver.filter((data) => data.status === 'Available').length;
  const unavailable = driver.filter(
    (data) => data.status === 'Unavailable'
  ).length;

  return (
    <div>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            {' '}
            {/* THEME SETTINGS BUTTON */}
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
            className={
              // MAIN BACKGROUND IMPLEMENTATION
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
                <div className="mt-5">
                  <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* top buttons in the dashboard */}
                      {/* use for navigation buttons */}
                      <Link to="/DriverViewAll">
                        <DashTopButton
                          value="All Drivers Details"
                          icon={<HiUserGroup />}
                        />
                      </Link>
                      <Link to="/DriverCreate">
                        <DashTopButton
                          value="New Driver"
                          icon={<AiOutlineUserAdd />}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */}
                      {/* use minimum 3, maximum 5 */}
                      <DashTopBox
                        icon={<FaUsers />}
                        label="Total Drivers"
                        data={totDrivers}
                      />
                      <DashTopBox
                        icon={<FaUserCheck />}
                        label="Available Drivers"
                        data={available}
                      />
                      <DashTopBox
                        icon={<FaUserTimes />}
                        label="Unavailable Drivers"
                        data={unavailable}
                      />
                    </div>
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

export default DriverDashboard;
