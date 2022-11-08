import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{RiMoneyDollarCircleFill} from 'react-icons/ri';
import { DashTopBox, DashTopButton, TransactionPieChart } from '../../components';

import { useStateContext } from '../../contexts/ContextProvider';
import {BiTransferAlt} from 'react-icons/bi';
import {MdOutlinePayments} from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const FinanceDashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();

  const [TRN, setTransactions] = useState([]);

  const getFinance = async () => {
    axios
      .get('http://localhost:8070/finance/viewTransaction')
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getFinance();
    const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  var totalRev = 0, totalExp = 0, exp2022 =0;

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
                            {/* start*/}

                            <div className="mt-5">

                            {TRN.filter((TRN) => TRN.trnType === 'Revenue').map((TRN) => {
                              totalRev += TRN.trnAmount;
                              })}
                            {TRN.filter((TRN) => TRN.trnType === 'Expense').map((TRN) => {
                              totalExp += TRN.trnAmount;
                              })}

                            <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                                {/* top buttons in the dashboard */} {/* use for navigation buttons*/}
                                <Link to="/FinanceViewAll">
                                  <DashTopButton value="View All Transactions" icon={<MdOutlinePayments/>} />
                                </Link>
                                <Link to="/FinanceNew">
                                  <DashTopButton value="Cash Transactions" icon={<BiTransferAlt/>}/>
                                </Link>
                                <Link to="/IncomeStatement">
                                  <DashTopButton value="Income Statement" icon={<BiTransferAlt/>}/>
                                </Link>
                              </div>
                            </div>

                            <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                              <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                                {/* small top boxes in the dashboard */} {/* use minimum 3, maximum 5 */}
                                <DashTopBox icon={<RiMoneyDollarCircleFill />} label="Revenue Total" data= {"Rs."+totalRev} />
                                <DashTopBox icon={<RiMoneyDollarCircleFill />} label="Expenses Total" data={"Rs."+totalExp} />
                              </div>
                            </div>

                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                                <TransactionPieChart />
                            </div>
                            </div>

                            {/* end */}
                            
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
    /* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
        ----------use this div to create your graphs.--------------
        ----------one div per graph -------------------------------
       <div>*/
  );
};

export default FinanceDashboard;