import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';
import { SiYourtraveldottv } from 'react-icons/si';
import { GiMoneyStack } from 'react-icons/gi';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  DashTopBox,
  DashTopButton,
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';
import TransportPieChart from '../../components/TransportPieChart';
import TransportMonthlyChart from '../../components/TransportMonthlyChart';

import { useStateContext } from '../../contexts/ContextProvider';

const TransportDashboard = () => {
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

  const getTransport = async () => {
    axios
      .get('http://localhost:8070/transport/')
      .then((res) => {
        setTransport(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getTransport();
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const totTransport = transport.length;
  const pendingTr = transport.filter(
    (data) => data.status === 'Pending'
  ).length;
  const completeTr = transport.filter(
    (data) => data.status === 'Completed'
  ).length;

  let total = 0;
  for (let index = 0; index < totTransport; index++) {
    total += transport[index].transportCost;
    total = Math.round(total * 100) / 100;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol',
  });

  const formatCost = formatter.format(total);

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
                      {/* top buttons in the dashboard */}{' '}
                      {/* use for navigation buttons */}
                      <Link to="/TransportViewAll">
                        <DashTopButton
                          value="All Transport Details"
                          icon={<SiYourtraveldottv />}
                        />
                      </Link>
                      <Link to="/TransportCreate">
                        <DashTopButton
                          value="New Transport"
                          icon={<MdOutlineAddLocationAlt />}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */}
                      {/* use minimum 3, maximum 5 */}
                      <Link to="/TransportViewAll">
                        <DashTopBox
                          icon={<i className="fa-solid fa-truck " />}
                          label="Total Transports"
                          data={totTransport}
                        />
                      </Link>
                      <DashTopBox
                        icon={<i className="fa-solid fa-hourglass px-1" />}
                        label="Pending Transports"
                        data={pendingTr}
                      />
                      <DashTopBox
                        icon={<i className="fa-solid fa-circle-check" />}
                        label="Completed Transports"
                        data={completeTr}
                      />
                      <DashTopBox
                        icon={<GiMoneyStack />}
                        label="Total Transportation Cost"
                        data={formatCost}
                      />
                    </div>
                  </div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    <TransportMonthlyChart />
                  </div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    <TransportPieChart />
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

export default TransportDashboard;
