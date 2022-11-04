import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Header,
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

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

  const [type, setType] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [timeOfDispatch, setTimeOfDispatch] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [description, setDescription] = useState('');
  const [driver, setDriver] = useState('');
  const [drivers, setDrivers] = useState([]);

  var currentDate = new Date().toISOString().split('T')[0];

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

  useEffect(() => {
    getDrivers();
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
                  <Header category="Form" title="Create New Transport Record" />
                  <div className="flex items-center justify-center ">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const newTransport = {
                          type,
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
                            alert('Transport Details Added');
                            navigate('/TransportViewAll');
                          })
                          .catch((err) => {
                            console.log(err);
                            alert('Error in Adding Transport Details');
                          });
                      }}
                    >
                      <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select
                          id="type"
                          name="type"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
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
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Destination Address
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="address"
                          placeholder="Enter destination..."
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
                          placeholder="Enter distance..."
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
                          placeholder="Enter description..."
                          required
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
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
