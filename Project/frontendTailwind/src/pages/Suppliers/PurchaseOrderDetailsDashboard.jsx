import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineFileDone } from "react-icons/ai";
import { BsClipboardPlus  } from "react-icons/bs";
import { DashTopBox, DashTopButton, PurchaseOrderStatusPieChart } from '../../components';
import { MdPendingActions } from "react-icons/md";
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings, FiClipboard} from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { TbReportSearch } from "react-icons/tb";


const PurchaseOrderDetailsDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [purchaseOrder, setPurchaseOrder] = useState([]);

  const getPurchaseOrder = async () => {
    axios.get("http://localhost:8070/purchaseOrder/")
        .then((res) => {
            setPurchaseOrder(res.data);
        })
        .catch((err) => {
            alert(err.message);
        })
}

useEffect(() => {
    getPurchaseOrder();
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
    }
}, []);

  const purOrder = purchaseOrder.length;
  const placedOrders = purchaseOrder.filter((order) => order.orderStatus === 'Order Placed').length;
  const completedOrders = purchaseOrder.filter((order) => order.orderStatus === 'Order Completed').length;

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
          <Link to="/PurchaseOrderView">
            <DashTopButton value="Purchase orders" icon={<FiClipboard />} />
          </Link>
          <Link to="/PurchaseOrderAdd">
            <DashTopButton value="Place a new order" icon={<BsClipboardPlus />} />
          </Link>
          <Link to="/RequestedStock">
            <DashTopButton value="View stock requests" icon={<TbReportSearch />} />
          </Link>

        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
          <DashTopBox icon={<FiClipboard />} label="Total Purchase Orders" data={purOrder} />     
          <DashTopBox icon={<MdPendingActions />} label="Orders Placed" data={placedOrders} />  
          <DashTopBox icon={<AiOutlineFileDone />} label="Orders Completed" data={completedOrders} />          
        </div>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                        <PurchaseOrderStatusPieChart />
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