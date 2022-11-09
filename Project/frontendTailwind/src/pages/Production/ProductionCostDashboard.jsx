import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DashTopBox, DashTopButton, ProductionPieChart } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';


//importing icons
import {RiShirtFill} from "react-icons/ri"
import {SiSpreadshirt} from "react-icons/si"
import {GiArmoredPants} from "react-icons/gi"
import {CgBox} from "react-icons/cg"

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const ProductionDashBoard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
  const [Order,setOrder] = useState([]);
  const [Sales, setSale] = useState([]);
  async function getOrders(){
      await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
          setOrder(res.data);
      }).catch((err)=>{
          alert(err.message);
      })
  }

  async function getSale(){
    axios
      .get(`http://localhost:8070/sales/`)
      .then((res) => {
        setSale(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //http://localhost:8070/sales/

  useEffect(() => {
    getOrders();// <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
    getSale(); 
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

 // 
  const pending= Sales.filter((Sales) => Sales.status == 'Pending').length;
  const requested= Order.filter((Order) => Order.status == 'Stock Requested').length;
  const completed= Order.filter((Order) => Order.status == 'Completed').length;
  const costed= Order.filter((Order) => Order.status == 'Costed').length;
  const total = pending + requested + completed + costed;
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
                          <div className="mt-5">
                          <div className="flex flex-wrap lg:flex-nowrap justify-left ml-10 mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                              {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
                              </div>
                          </div>

                          <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                              {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                              <Link to="/pendingOrders"><DashTopBox  icon={<CgBox />} label="Pending Orders" data={pending} /></Link>
                              <Link to ="/viewRequested"><DashTopBox icon={<CgBox />} label="Stock Requisitions" data={requested} /></Link>
                              <Link to ="/completedOrders"><DashTopBox icon={<CgBox />} label="Granted Orders" data={completed} /></Link>
                              <Link to ="/costedOrders"><DashTopBox icon={<CgBox />} label="Costed Orders" data={costed} /></Link>
                              <DashTopBox icon={<CgBox />} label="Total Orders" data={total} />         
                              </div>
                          </div>
                      
                              <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                              <ProductionPieChart/>
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

export default ProductionDashBoard;
