import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GiRolledCloth, GiSewingNeedle, GiClothes } from 'react-icons/gi';
import { FaCoins , FaWarehouse, FaFileSignature, FaHouseDamage, FaChartLine, FaLayerGroup} from 'react-icons/fa';
import { AiOutlineStock } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { DashTopBox, DashTopButton } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import StockBarChart from '../../components/StockBarChart';

import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import StockPieChart from '../../components/StockPieChart';

const StocksDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
  const [stock, setStock] = useState([]); //stock is the state variable and setStock is the function to update the state variable


  const getStock = async () => {  //getStock is the function to get the data from the backend
    axios.get("http://localhost:8070/stock/")
      .then((res) => {
        setStock(res.data); //setStock is used to update the state variable
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => { //useEffect is used to call the function getStock
    getStock();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [])


  const itemCount = stock.length;
  const countRawMaterials = stock.filter((stk) => stk.stockCategory === 'Raw materials').length;
  const countWorkInProgress = stock.filter((stk) => stk.stockCategory === 'Work in progress').length;
  var totalDamaged = 0;
  for( let i=0; i< itemCount; i++){
    totalDamaged += stock[i].damagedQty
  }

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

                  <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
                      <Link to="/StockView">
                        <DashTopButton icon={<FaWarehouse />} value="View All Stocks" />
                      </Link>

                      <Link to="/StockBreakdown">
                        <DashTopButton icon={<FaFileSignature/>} value="View Stocks Breakdown" />
                      </Link>

                      <Link to="/StockAdd">
                        <DashTopButton icon={<BiAddToQueue/>} value="Add New Stock" />
                      </Link>

                      <Link to="/StockUtilAddOption">
                        <DashTopButton icon={<FaLayerGroup />} value="Add New Entry for exisitng stock" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}

                      <Link to ="/StockView">
                      <DashTopBox icon={<FaChartLine />} label="Total Items" data={itemCount} />
                      </Link>

                      <DashTopBox icon={<FaHouseDamage />} label="Total Damaged Stocks" data={totalDamaged} />
                      
                      <Link to="/ViewAllRawMaterials">
                      <DashTopBox icon={<GiRolledCloth />} label="Total Raw Materials" data={countRawMaterials} />
                      </Link>

                      <Link to="/ViewAllWorkInProgress">
                      <DashTopBox icon={<GiSewingNeedle />} label="Total Work In Progress" data={countWorkInProgress} />
                      </Link>
                    </div>
                  </div>

                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    <StockPieChart />
                  </div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    <StockBarChart />
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



export default StocksDashboard;
