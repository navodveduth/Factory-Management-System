import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
  Header,
} from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const TransportRecord = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [transport, setTransport] = useState([]);

  const { id } = useParams(); // get the id from the url

  const getTransport = async () => {
    axios
      .get(`http://localhost:8070/transport/${id}`)
      .then((res) => {
        setTransport(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getTransport();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [id]);

  return (
    <div>
      {/* DON'T CHANGE ANYTHING HERE */}

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
              <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                <Header category="Record" title="Transport Record" />
                <div>
                  <div className="bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5">
                    <h1 className="text-2xl font-bold">Transport Details</h1>
                    <div className="text-md ml-12 pt-5">
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Transport Number</span> :{' '}
                        {transport.transportID}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold"> Transport Type </span> :{' '}
                        {transport.type}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Transport Info</span> :{' '}
                        {transport.typeInfo}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold"> Destination Address </span>{' '}
                        : {transport.destinationAddress}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold"> Date </span> :{' '}
                        {new Date(transport.date).toDateString()}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Time Of Dispatch</span> :{' '}
                        {transport.timeOfDispatch}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Distance</span> :{' '}
                        {transport.distance} Km
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Transportation Cost</span> :{' '}
                        LKR {`${transport.transportCost}.00`}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Description</span> :{' '}
                        {transport.description}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Driver</span> :{' '}
                        {transport.driver}
                      </div>
                      <div className="p-1 py-1 text-lg">
                        <span className="font-bold">Status</span> :{' '}
                        {transport.status}
                      </div>
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

export default TransportRecord;
