import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const PurchaseOrderDetailsDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  return (

    <div>

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
                        
    <div className="mt-5">

      <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
          <Link to="/PurchaseOrderDetailsView">
            <DashTopButton value="Purchase orders" />
          </Link>
          <Link to="/PurchaseOrderDetailsForm">
            <DashTopButton value="Place a new order" />
          </Link>

        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FiUser />} label="Total Supplier records" data="0" />      
          
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

export default PurchaseOrderDetailsDashboard;