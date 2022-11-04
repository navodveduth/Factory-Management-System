import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  Header,
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';

const DriverView = () => {
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

  const navigate = useNavigate(); // This is a hook that allows us to navigate to a different route

  const [nic, setNic] = useState('');
  const [fullName, setFullName] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

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
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                  <Header category="Form" title="New Driver" />
                  <div className="flex items-center justify-center ">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const newDriver = {
                          nic,
                          fullName,
                          drivingLicenseNo,
                          contactNo,
                          vehicleNo,
                          vehicleModel,
                        };

                        await axios
                          .post(
                            'http://localhost:8070/driver/create',
                            newDriver
                          )
                          .then((res) => {
                            alert('Driver Details Added');
                            navigate('/DriverViewAll');
                          })
                          .catch((err) => {
                            console.log(err);
                            alert('Driver already exits');
                          });
                      }}
                    >
                      <div className="mb-3">
                        <label className="form-label">NIC</label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="nic"
                          placeholder="Enter nic number..."
                          // pattern="[0-9]{9}[vVxX] | [0-9]{12}"
                          title="You entered an invalid NIC number format which must be 9 digits and a letter or 12 digits"
                          required
                          onChange={(e) => {
                            setNic(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="fullName"
                          placeholder="Enter full name..."
                          required
                          onChange={(e) => {
                            setFullName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Driving License Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="drivingLicenseNo"
                          placeholder="Enter driving license..."
                          required
                          onChange={(e) => {
                            setDrivingLicenseNo(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                          type="tel"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="contactNo"
                          placeholder="Enter contact number..."
                          pattern="[0-9]{10}"
                          title="You entered an invalid contact number format which must be 10 digits"
                          required
                          onChange={(e) => {
                            setContactNo(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Vehicle Number</label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="vehicleNo"
                          placeholder="Enter vehicle number..."
                          required
                          onChange={(e) => {
                            setVehicleNo(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Vehicle Model</label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="vehicleModel"
                          placeholder="Enter vehicle model..."
                          required
                          onChange={(e) => {
                            setVehicleModel(e.target.value);
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600"
                      >
                        Create Driver
                      </button>
                    </form>
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
export default DriverView;
