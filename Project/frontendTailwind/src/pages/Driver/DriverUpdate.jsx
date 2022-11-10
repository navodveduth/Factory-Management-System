import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Swal from 'sweetalert2';
import {
  Header,
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';

const DriverUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [fullName, setFullName] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [status, setStatus] = useState('');

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/driver/${id}`)
      .then((res) => {
        setFullName(res.data.fullName);
        setDrivingLicenseNo(res.data.drivingLicenseNo);
        setVehicleNo(res.data.vehicleNo);
        setVehicleModel(res.data.vehicleModel);
        setStatus(res.data.status);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const getEmployees = async () => {
    axios
      .get('http://localhost:8070/employee/viewEmployee')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

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
                  <Header category="Form" title="Update Driver Details" />
                  <div className="flex items-center justify-center">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const newDriver = {
                          fullName,
                          drivingLicenseNo,
                          vehicleNo,
                          vehicleModel,
                          status,
                        };

                        await axios
                          .put(
                            `http://localhost:8070/driver/update/${id}`,
                            newDriver
                          )
                          .then((res) => {
                            Swal.fire({
                              icon: 'success',
                              title: 'Data Successfully Updated',
                              color: '#f8f9fa',
                              background: '#6c757d',
                              showConfirmButton: false,
                              timer: 2000,
                            });
                            navigate('/DriverViewAll');
                          })
                          .catch((err) => {
                            console.log(err);
                            alert('Already exits');
                          });
                      }}
                    >
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <select
                          id="fullName"
                          name="fullName"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          required
                          onChange={(e) => {
                            setFullName(e.target.value);
                          }}
                        >
                          <option value={fullName}>{fullName}</option>
                          {employees.map((item, index) =>
                            item.employeeDesignation === 'Driver' ? (
                              <option value={item.employeeFullName} key={index}>
                                {item.employeeFullName}
                              </option>
                            ) : (
                              ''
                            )
                          )}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Driving License Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="drivingLicenseNo"
                          value={drivingLicenseNo}
                          onChange={(e) => {
                            setDrivingLicenseNo(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Vehicle Number</label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="vehicleNo"
                          value={vehicleNo}
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
                          value={vehicleModel}
                          onChange={(e) => {
                            setVehicleModel(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          id="status"
                          name="status"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          value={status}
                          required
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600"
                      >
                        Update
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

export default DriverUpdate;
