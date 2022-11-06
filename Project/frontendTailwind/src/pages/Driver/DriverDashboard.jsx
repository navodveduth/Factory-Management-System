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
  Header,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import TableData from '../../components/Table/TableData';
import TableHeader from '../../components/Table/TableHeader';

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
                  <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
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
                      <Link to="/DriverViewAll">
                        <DashTopBox
                          icon={<FaUsers />}
                          label="Total Drivers"
                          data={totDrivers}
                        />
                      </Link>
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

                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                  <Header category="Table" title="Available Drivers" />

                  <div
                    className="block w-full overflow-x-auto rounded-lg"
                    id="tableContainer"
                  >
                    <table className="w-full rounded-lg">
                      <thead>
                        <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                          <TableHeader value="NIC" />
                          <TableHeader value="Name" />
                          <TableHeader value="Driving License Number" />
                          <TableHeader value="Contact Number" />
                          <TableHeader value="Vehicle Number" />
                          <TableHeader value="Vehicle Model" />
                        </tr>
                      </thead>

                      <tbody>
                        {driver.map((data) =>
                          data.status === 'Available' ? (
                            <tr
                              className="text-sm h-10 border dark:border-slate-600"
                              key={data._id}
                            >
                              {data.driverDetails.map((driverData) => (
                                <TableData value={driverData.employeeNIC} />
                              ))}

                              <TableData value={data.fullName} />
                              <TableData value={data.drivingLicenseNo} />
                              {data.driverDetails.map((driverData) => (
                                <TableData
                                  value={driverData.employeeContactNumber}
                                />
                              ))}
                              <TableData value={data.vehicleNo} />
                              <TableData value={data.vehicleModel} />
                            </tr>
                          ) : (
                            ''
                          )
                        )}
                      </tbody>
                    </table>
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
