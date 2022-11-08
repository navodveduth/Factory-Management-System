import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton, ProductionPieChart } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import {RiShirtFill} from "react-icons/ri"
import {FaTshirt} from "react-icons/fa"
import {SiSpreadshirt} from "react-icons/si"
import {GiArmoredPants} from "react-icons/gi"
import {CgBox} from "react-icons/cg"

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const ProductionDashBoard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
  const [Order,setOrder] = useState([]);

  async function getOrders(){
      await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
          setOrder(res.data);
      }).catch((err)=>{
          alert(err.message);
      })
  }

  useEffect(() => {
    getOrders();// <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const prodCount = Order.length;
  const prodT= Order.filter((Order) => Order.orderName == 'T-Shirts').length;
  const prodCollars= Order.filter((Order) => Order.orderName == 'Collars').length;
  const prodTrousers= Order.filter((Order) => Order.orderName == 'Trousers').length;
  const prodShirts= Order.filter((Order) => Order.orderName == 'Shirts').length;
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
                              <Link to="/viewRequested">
                                  <DashTopButton value="View All Orders" />
                              </Link>
                              <Link to="/newOrder">
                                  <DashTopButton value="Create New Production Voucher"/>
                              </Link>
                              </div>
                          </div>

                          <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                              {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                              <Link to="/pendingOrders"><DashTopBox  icon={<CgBox />} label="Pending Orders" data={prodCount} /></Link>
                              <Link to ="/viewRequested"><DashTopBox icon={<CgBox />} label="Stock Requisitions" data={prodT} /></Link>
                              <Link to ="/completedOrders"><DashTopBox icon={<SiSpreadshirt/>} label="Granted Orders" data={prodCollars} /></Link>
                              <DashTopBox icon={<GiArmoredPants/>} label="Total Trousers" data={prodTrousers} />
                              <DashTopBox icon={<RiShirtFill />} label="Total Shirts" data={prodShirts} />       
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
