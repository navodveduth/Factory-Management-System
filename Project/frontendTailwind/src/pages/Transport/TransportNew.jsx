import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const TransportNew = () => {
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

  const navigate = useNavigate(); // useNavigate hook to redirect to another page after form submission is successful

  const [transportID, setTransportID] = useState('');
  const [type, setType] = useState('');
  const [typeInfo, setTypeInfo] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [timeOfDispatch, setTimeOfDispatch] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [description, setDescription] = useState('');
  const [driver, setDriver] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [goods, setGoods] = useState([]);

  const currentDate = new Date().toISOString().split('T')[0];

  const getDrivers = async () => {
    axios
      .get('http://localhost:8070/driver/')
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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

  const getGoods = async () => {
    axios
      .get('http://localhost:8070/sales/')
      .then((res) => {
        setGoods(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDrivers();
    getEmployees();
    getGoods();
  }, []);

  return (
    <div>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
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
                  <Header category="Form" title="Add New Transport Record" />
                  <div className="flex items-center justify-center ">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const newTransport = {
                          transportID,
                          type,
                          typeInfo,
                          destinationAddress,
                          date,
                          distance,
                          timeOfDispatch,
                          transportCost,
                          driver,
                          description,
                        };

                        await axios
                          .post(
                            'http://localhost:8070/transport/create',
                            newTransport
                          )
                          .then((res) => {
                            Swal.fire({
                              icon: 'success',
                              title: 'Transport Details Saved Successfully',
                              color: '#f8f9fa',
                              background: '#6c757d',
                              showConfirmButton: false,
                              timer: 2000,
                            });
                            navigate('/TransportViewAll');
                          })
                          .catch((err) => {
                            console.log(err);
                            alert('Error in Adding Transport Details');
                          });
                      }}
                    >
                      <div className="mb-3">
                        <label htmlFor="transportID" className="form-label">
                          Transport Number :
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          pattern="[A-Z]{1}[0-9]{3,7}"
                          id="transportID"
                          defaultValue="T"
                          maxLength={20}
                          title="The Transport Number requires a letter and 3 digits"
                          required
                          onChange={(e) => {
                            setTransportID(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" className="block">
                          Transportation Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          className="mt-1  w-200 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          required
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                        >
                          <option selected>Select...</option>
                          <option value="Staff">Staff</option>
                          <option value="Employee">Employee</option>
                          <option value="Goods">Goods</option>
                        </select>
                        {type === 'Staff' || type === 'Employee' ? ( // IF TYPE IS STAFF OR EMPLOYEE
                          <select
                            id="trInfo"
                            name="trInfo"
                            className="mt-1 ml-8 w-570 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                            required
                            onChange={(e) => {
                              setTypeInfo(e.target.value);
                            }}
                          >
                            <option selected>Select...</option>
                            {employees.map((item, index) => (
                              <option value={item.employeeFullName} key={index}>
                                {item.employeeFullName}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            id="trInfo"
                            name="trInfo"
                            className="mt-1 ml-8 w-640 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                            required
                            onChange={(e) => {
                              setTypeInfo(e.target.value);
                            }}
                          >
                            <option selected>Select...</option>
                            {goods.map((item, index) =>
                              item.status === 'Completed' ? ( // CHECKING IF THE GOODS ARE FINISHED
                                <option
                                  value={`${item.invoiceNo} - ${item.itemName} x ${item.quantity}`}
                                  key={index}
                                >
                                  {`${item.invoiceNo} - ${item.itemName} x ${item.quantity}`}
                                </option>
                              ) : (
                                // IF NOT FINISHED, IT WILL NOT BE DISPLAYED
                                ''
                              )
                            )}
                          </select>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Destination Address
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="address"
                          placeholder="Enter the destination..."
                          required
                          onChange={(e) => {
                            setDestinationAddress(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                          type="date"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="date"
                          min={currentDate}
                          required
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Time Of Dispatch</label>
                        <input
                          type="time"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="time"
                          required
                          onChange={(e) => {
                            setTimeOfDispatch(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Distance (Km)</label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="distance"
                          placeholder="Enter the distance..."
                          required
                          min="0"
                          onChange={(e) => {
                            setDistance(e.target.value);
                            setTransportCost(e.target.value * 100 + 250);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Driver</label>
                        <select
                          id="driver"
                          name="driver"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          required
                          onChange={(e) => {
                            setDriver(e.target.value);
                          }}
                        >
                          <option selected>Select...</option>
                          {drivers.map((item, index) => (
                            <option value={item.fullName} key={index}>
                              {item.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="description"
                          placeholder="Enter the description..."
                          required
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="totalCost" className="form-label">
                          Transportation Cost:
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="totalCost"
                          value={distance * 100}
                          readOnly
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600"
                      >
                        Add Transport Record
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
export default TransportNew;
