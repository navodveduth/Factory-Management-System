import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiSettings, FiUsers, FiUserPlus } from 'react-icons/fi';
import { DashTopBox, DashTopButton, SalesPieChart, Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../../contexts/ContextProvider';


const CustomerDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [customer, setCustomer] = useState([]);

  const getCustomer = async () => {
    axios
      .get('http://localhost:8070/customer/all')
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  useEffect(() => {
    getCustomer(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const customerCount = customer.length;
  //const totalCustomers= customer.filter((customer) => sale.status === 'Finished').length;
//   const ongoingOrders= customer.filter((sale) => sale.status === 'Pending').length;
//   const newOrders= customer.filter((sale) => sale.status === 'Placed').length;

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

                            <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                                {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
                                <Link to="/CustomerViewAll">
                                  <DashTopButton value="Customers" icon = {<FiUsers/>}/>
                                </Link>
                                <Link to="/CustomerCreate">
                                  <DashTopButton value="Register a Customer" icon = {<FiUserPlus/>}/>
                                </Link>
                              </div>
                            </div>

                            <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                                {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                                <DashTopBox icon={<FiUsers />} label="Total Customers" data={customerCount} />
                                {/* <DashTopBox icon={<FiPackage />} label="Ongoing Orders" data={ongoingOrders} />
                                <DashTopBox icon={<FiPackage />} label="Placed Orders" data={newOrders} />
                                <DashTopBox icon={<FiPackage />} label="Finished Orders" data={finishedOrders} /> */}
                              </div>
                            </div>


                              <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                    <SalesPieChart/>
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

export default CustomerDashboard;
