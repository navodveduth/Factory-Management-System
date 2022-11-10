import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GiRolledCloth, GiSewingNeedle, GiClothes } from 'react-icons/gi';
import { FaCoins, FaChartBar, FaInbox, FaLayerGroup, FaHourglassHalf, FaGetPocket, FaFileAlt } from 'react-icons/fa';
import { AiOutlineStock } from 'react-icons/ai';
import { DashTopBox, DashTopButton } from '../../components';
import { BiAddToQueue, BiCheckCircle } from 'react-icons/bi';

import { useStateContext } from '../../contexts/ContextProvider';
import DamagedStockPieChart from '../../components/StockUtilPieChart';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import StockUtilPieChart from '../../components/StockUtilPieChart';
import StockUtilLineChart from '../../components/StockUtilLineChart';
import { CgBox } from 'react-icons/cg';


const StockUtilisationDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [stockUtil, setStockUtil] = useState([]); //damagedStock is the state variable and setDamagedStock is the function to update the state variable
  const [Order, setOrder] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [resolved, setResolved] = useState([]);

  const getStockUtil = async () => {  //getdamagedStock is the function to get the data from the backend
    axios.get("http://localhost:8070/stockUtilisation/")
      .then((res) => {
        setStockUtil(res.data); //setDamagedStock is used to update the state variable
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  async function getProcessing(){
    await axios.get("http://localhost:8070/pendingStock/status/"+ "Processing")
    .then((res) => {
        setProcessing(res.data); //setStock is used to update the state variable
        console.log(res.data);
    })
    .catch((err) => {
        alert(err.message);
    })
  }

  async function getResolved(){
    await axios.get("http://localhost:8070/pendingStock/status/"+ "Resolved")
    .then((res) => {
        setResolved(res.data); //setStock is used to update the state variable
        console.log(res.data);
    })
    .catch((err) => {
        alert(err.message);
    })
  }

  async function getOrders(){
    await axios.get("http://localhost:8070/production/order/allOrders").then((res)=>{
        setOrder(res.data);
    }).catch((err)=>{
        alert(err.message);
    })
}

  useEffect(() => { //useEffect is used to call the function getdamagedStock
    getStockUtil();
    getOrders();
    getProcessing();
    getResolved();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [])

  const itemCount = stockUtil.length;
  const additions = stockUtil.filter((stk) => stk.type === 'Additions').length;
  const issues = stockUtil.filter((stk) => stk.type === 'Issues').length;
  
  const requested= Order.filter((Order) => Order.status == 'Stock Requested').length;

  const processCnt = processing.length;
  const resolveCnt = resolved.length;

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
                      <Link to="/StockUtilisation">
                        <DashTopButton icon={<FaChartBar />} value="View All Stocks Transactions" />
                      </Link>

                      <Link to="/StockUtilAddOption">
                        <DashTopButton icon={<FaLayerGroup />} value="Add New Entry for existing stock" />
                      </Link>

                      <Link to="/PendingStockAdd">
                        <DashTopButton icon={<FaInbox />} value="Add new stock purchase request" />
                      </Link>

                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                      
                      <Link to ="/StockUtilisation">
                      <DashTopBox icon={<FaFileAlt />} label="Total Records " data={itemCount} />                        </Link>

                      <Link to ="/PendingStockRequisitions">
                        <DashTopBox icon={<FaGetPocket />} label="Stock Requisitions" data={requested} />
                        </Link>

                        <Link to="/ProcessingRequest">
                        <DashTopBox icon={<FaHourglassHalf />} label="Processing" data={processCnt} />
                      </Link>

                      <Link to="/ResolvedRequest">
                        <DashTopBox icon={<BiCheckCircle />} label="Resolved" data={resolveCnt} />
                      </Link>

                      <Link to="/ViewAllAdditions">
                        <DashTopBox icon={<AiOutlineStock />} label="Additions" data={additions} />
                      </Link>

                      <Link to="/ViewAllIssues">
                        <DashTopBox icon={<AiOutlineStock />} label="Issues" data={issues} />
                      </Link>
                      {/* <DashTopBox icon={<GiRolledCloth />} label="Total Raw Materials" data={countRawMaterials} />
    <DashTopBox icon={<GiSewingNeedle />} label="Total Work in progress" data={countWorkInProgress} />
    <DashTopBox icon={<GiClothes />} label="Total Finished Goods" data={countFinishedGoods} /> */}
                    </div>
                  </div>
                  {/* stock charts */}
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    <StockUtilLineChart />
                  </div>
                  
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    <StockUtilPieChart />
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

export default StockUtilisationDashboard;
